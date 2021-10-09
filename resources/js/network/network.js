import { Method, XHREvent } from '../helper/types';
import { _hasFiles, _objectToFormData, _mergeDataIntoQueryString, hrefToUrl, mimeTypeToExt } from '../helper/util';
import { execLifecycleCallback } from './lifecycleHook';
import { processResponseHeader, isJsonResponse } from './headerManager';

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
                Accept: '*/*',
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
            processResponseHeader(res, id, key);

            return res;
        })
        .then(async function(data) {
            const status = data.status;

            if(status < 300) {
                let response = {status, data: {}};
                
                if(status === 204) { 
                    execLifecycleCallback(id, XHREvent.SUCCESS, response);
                    return response; 
                }
                
                if(! isJsonResponse(data)) {
                    await handleBlobResponse(data);
                    
                    execLifecycleCallback(id, XHREvent.SUCCESS, response);
                    return response;
                }
            }

            return data.json()
            .then(r => {
                let response = {status, data: r};

                if(status >= 400) execLifecycleCallback(id, XHREvent.ERROR, response);
                if(status < 300) execLifecycleCallback(id, XHREvent.SUCCESS, response);

                return response;
            })
            .catch(e => {
                let response = {status, data: {error: e, message: data.statusText + ' - unable to parse response'}};

                execLifecycleCallback(id, XHREvent.ERROR, response);
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

export function _replicatePublicMethods(id, key, classIngredient, methodNames) {
    let methods = {};

    for (const name of Object.values(methodNames)) {
        methods = {...methods, [name]: _manifestNetworkHandler(window._aquaroute, classIngredient, name, id, key) };
    }

    return methods;
}

async function handleBlobResponse(response) {
    const defaultMime = "application/octet-stream";
    const contentType = response.headers.get("content-type") || defaultMime;
    const contentDisposition = response.headers.get('content-disposition');

    const sippliedFilename = contentDisposition ? contentDisposition.split('filename=')[1] : '';

    const filename = sippliedFilename !== '""' 
                    ? sippliedFilename 
                    : 'download' + mimeTypeToExt(contentType.split(';')[0]);
    
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    return;
}