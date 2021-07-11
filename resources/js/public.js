function _aquaGenerate(id) {
    return _replicatePublicMethods(_findComponentById(id).routes, id);
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