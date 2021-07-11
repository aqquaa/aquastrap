function _manifestNetworkHandler(url, successCallback = null, errorCallback = null) {
    return async (formData = {}) => {
        let options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            },
            credentials: "same-origin",
            method: 'POST',
            body: JSON.stringify(formData),
        };

        const reponse = await fetch(url, options)
        .then(res => {
            if(res.status >= 400) {
                throw new Error(res.status + ' Network request failed!');
            }

            return res.json();
        })
        .then(function(data) {
            if (typeof successCallback === 'function') { successCallback(data); }

            return data;
        })
        .catch(function(error) {
            if (typeof errorCallback === 'function') { errorCallback(error); }

            throw new Error(error);
        });

        return reponse;
    };
}

function _replicatePublicMethods(routes, id, successCallback = null, errorCallback = null) {
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