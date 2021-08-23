import { Method, XHREvent } from './helper/types';
import { _hasFiles, _objectToFormData, _mergeDataIntoQueryString, hrefToUrl } from './helper/util';

function _manifestNetworkHandler(url, ingredient, classMethod, id, key) {
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
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
                "X-Aquastrap": JSON.stringify({
                    ingredient: ingredient,
                    method: classMethod
                })
            },
            signal: cancelSignal,
            credentials: "same-origin",
            method: method,
            ...(method !== Method.GET && {
                body: data
            }),
        };

        execLifecycleCallback(id, XHREvent.START, null);

        const reponse = await fetch(url, options)
        .then(res => {
            return res;
        })
        .then(function(data) {
            const status = data.status;

            return data.json().then(r => {
                let response = {status, data: r};

                if(status >= 400) execLifecycleCallback(id, XHREvent.ERROR, response);
                if(status < 300) execLifecycleCallback(id, XHREvent.SUCCESS, response);

                return response;
            });
        })
        .catch(function(error) {
            execLifecycleCallback(id, XHREvent.ERROR, error);

            return error;
        })
        .finally(_ => execLifecycleCallback(id, XHREvent.FINISH, null));

        return reponse;
    };
}

function execLifecycleCallback(id, type, data) {
    _aquaCore.resolveLifecycleCallback(type, id)(data);
}

export function _replicatePublicMethods(id, key, classIngredient, methodNames) {
    let methods = {};

    for (const name of Object.values(methodNames)) {
        methods = {...methods, [name]: _manifestNetworkHandler(window._aquaroute, classIngredient, name, id, key) };
    }

    return methods;
}