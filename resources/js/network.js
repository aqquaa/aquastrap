import { Method } from './helper/types';
import { _hasFiles, _objectToFormData, _mergeDataIntoQueryString, hrefToUrl } from './helper/util';

function _manifestNetworkHandler(url, successCallback = null, errorCallback = null) {
    return async (data = {}, method = Method.POST, signal = null) => {
        if (_hasFiles(data) && !(data instanceof FormData)) {
            data = _objectToFormData(data)
        }

        if (!(data instanceof FormData)) {
            const [_href, _data] = _mergeDataIntoQueryString(method, url, data)
            url = hrefToUrl(_href)
            data = JSON.stringify(_data)
        }

        const cancelSignal = signal || (new AbortController()).signal;

        let options = {
            headers: {
                Accept: 'application/json',
                ...( ! (data instanceof FormData) && {"Content-Type": "application/json"} ),
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            },
            signal: cancelSignal,
            credentials: "same-origin",
            method: method,
            ...(method !== Method.GET && {
                body: data
            }),
        };

        const reponse = await fetch(url, options)
        .then(res => {
            return res;
        })
        .then(function(data) {
            if(data.status >= 400 && typeof errorCallback === 'function') { errorCallback(data); }

            if (data.status < 300 && typeof successCallback === 'function') { successCallback(data); }

            const status = data.status;

            return data.json()
            .then(r => ({status, data: r}));
        })
        .catch(function(error) {
            if (typeof errorCallback === 'function') { errorCallback(error); }

            return error;
        });

        return reponse;
    };
}

export function _replicatePublicMethods(routes, id, successCallback = null, errorCallback = null) {
    let methods = {};

    for (const [name, url] of Object.entries(routes)) {
        methods = {...methods, [name]: _manifestNetworkHandler(
            url, 
            successCallback || _aquaCore.resolveSuccessCallback(id), 
            errorCallback || _aquaCore.resolveErrorCallback(id)
        ) };
    }

    return methods;
}