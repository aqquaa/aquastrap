function _aquaGenerate(routes, id) {
    return {
        successCallback: null,
        errorCallback: null,
        on(config) {
            if(_hasProperty(config, 'success')) this.successCallback = config.success;
            if(_hasProperty(config, 'error')) this.errorCallback = config.error;

            return {_m: _replicatePublicMethods(routes, id, this.successCallback, this.errorCallback) };
        },
        _r: routes,
        _m: _replicatePublicMethods(routes, id)
    }
}

function _registerAquaConfig(id = '') {
    return {
        onSuccess(succesCallback) {
            _setAquaConfig({success: succesCallback}, id);
            return this;
        },
        onError(errCallback) {
            _setAquaConfig({error: errCallback}, id);
            return this;
        },
    }
}