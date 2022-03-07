import merge from 'lodash/fp/merge';
import { _hasProperty, _hasFiles, _objectToFormData } from '../js/helper/util';
import { Method, HOOK_NAME } from './Fixed';

export default function (HookHub, url, method = Method.GET, payload = {}, userOptions = {}) {
    const processed = processPayload(url, method, payload)
    const cancelToken = _hasProperty(userOptions, cancelToken) ? userOptions.cancelToken : null;
    const signal = ! cancelToken && _hasProperty(userOptions, signal) ? userOptions.signal : new AbortController().signal;

    const defaultOptions = {
        method,
        url: processed.url,
        data: method === Method.GET ? {} : processed.payload,
        ...( cancelToken ? {cancelToken} : {signal} ),
        headers: {
            // Accept: '*/*',
            Accept: "text/html, application/json",
            ...(!(payload instanceof FormData) && {
                "Content-Type": "application/json",
            }),
            "X-Requested-With": "XMLHttpRequest",
            // "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        },
        onUploadProgress: (progress) => {
            if(! (payload instanceof FormData)) return

            HookHub.run(HOOK_NAME.UPLOAD, progress)
        },
        onDownloadProgress: (progress) => {
            if(! (payload instanceof FormData)) return

            HookHub.run(HOOK_NAME.DOWNLOAD, progress)
        }
    };
    
    return merge(defaultOptions, userOptions)
}

function processPayload(url, method, payload, forceFormData) {
    if (
        (_hasFiles(payload) || forceFormData) &&
        !(payload instanceof FormData)
    ) {
        payload = _objectToFormData(payload);
    }

    if (
        !(payload instanceof FormData) &&
        method === Method.GET &&
        Object.keys(payload).length
    ) {
        url = url.endsWith("/") ? url.slice(0, -1) : url;

        const params = new URLSearchParams({ ...payload });

        url += "?" + params.toString();
    }

    return {
        url, payload
    }
}