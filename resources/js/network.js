import { Method, Callback } from './helper/types';
import { _hasFiles, _objectToFormData, _mergeDataIntoQueryString, hrefToUrl } from './helper/util';

function _manifestNetworkHandler(url, ingredient, classMethod, id) {
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

        const reponse = await fetch(url, options)
        .then(res => {
            return res;
        })
        .then(function(data) {
            if(data.status >= 400) { execUserCallback(id, Callback.ERROR, data); }

            if (data.status < 300) { execUserCallback(id, Callback.SUCCESS, data); }

            const status = data.status;

            return data.json()
            .then(r => ({status, data: r}));
        })
        .catch(function(error) {
            execUserCallback(id, Callback.ERROR, data);

            return error;
        });

        return reponse;
    };
}

function execUserCallback(id, type, data) {
    switch (type) {
        case Callback.SUCCESS:
            _aquaCore.resolveSuccessCallback(id)(data);
            break;
        case Callback.ERROR:
            _aquaCore.resolveErrorCallback(id)(data);
            break;
    
        case Callback.START:
            
            break;
    
        default:
            break;
    }
}

export function _replicatePublicMethods(id, classIngredient, methodNames) {
    let methods = {};

    for (const name of Object.values(methodNames)) {
        methods = {...methods, [name]: _manifestNetworkHandler(window._aquaroute, classIngredient, name, id) };
    }

    return methods;
}