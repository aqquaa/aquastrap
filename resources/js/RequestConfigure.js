import { _hasProperty, _hasFiles, _objectToFormData } from './helper/util';
import { Method, HOOK_NAME } from './Fixed';
import merge from 'lodash/fp/merge';

export function _injectCancelSignal(options) {
    const cancelToken = _hasProperty(options, 'cancelToken') ? options.cancelToken : null;
    const signal = ! cancelToken && _hasProperty(options, 'signal') ? options.signal : null;
    let abortControllerInstance = null;
    if(! cancelToken && ! signal) {
        abortControllerInstance = new AbortController;
        options = Object.assign({}, options, {signal: abortControllerInstance.signal})
    }

    return {
        options,
        abortControllerInstance
    }
}

export function _composeConfig(HookHub, url, method = Method.GET, payload = {}, userOptions = {}) {
    const processed = processPayload(url, method, payload)

    const cancelToken = _hasProperty(userOptions, 'cancelToken') ? userOptions.cancelToken : null;
    let signal = ! cancelToken && _hasProperty(userOptions, 'signal') ? userOptions.signal : (new AbortController).signal;

    const defaultOptions = {
        method,
        url: processed.url,
        data: method === Method.GET ? {} : processed.payload,
        ...( cancelToken ? {cancelToken} : {signal} ),
        headers: {
            Accept: '*/*',
            // Accept: "application/json",
            "Content-Type": payload instanceof FormData ? "multipart/form-data" : "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        onUploadProgress: (progress) => {
            if(! (processed.payload instanceof FormData)) return

            HookHub.run(HOOK_NAME.UPLOAD, progress)
        },
        onDownloadProgress: (progress) => {
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