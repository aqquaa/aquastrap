import merge from 'lodash/fp/merge';
import { _hasProperty, _hasFiles, _objectToFormData } from '../js/helper/util';
import { Method, LIFE } from './Fixed';

const nothing = () => {};

export default function (EventHub, url, method = Method.GET, payload = {}, userOptions = {}, userHooks = {}) {
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

            EventHub.run(LIFE.UPLOAD, {progress})
        },
        onDownloadProgress: (progress) => {
            if(! (payload instanceof FormData)) return

            EventHub.run(LIFE.DOWNLOAD, {progress})
        }
    };

    const defaultHooks = {
        onBefore: nothing,
        onStart: nothing,
        onCancel: nothing,
        onSuccess: nothing,
        onError: nothing,
        onFinish: nothing,
    }
    
    const options = merge(defaultOptions, userOptions)
    const hooks = merge(defaultHooks, userHooks)

    return {
        options,
        hooks,
    }
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