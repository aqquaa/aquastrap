function _aquaGenerate(id) {
    const methodsAccessor = _replicatePublicMethods(_findComponentById(id).routes, id);

    let hook = {};

    for (const [name, networkHandler] of Object.entries(methodsAccessor)) {
        hook = {
            ...hook,
            get [name]() {
                return {
                    processing: false,
                    result: null,
                    submit(form, type = 'POST') {
                        this.processing = true;
                        this.result = null;

                        networkHandler(form, type)
                        .then(res => {
                            this.result = res;
                        })
                        .catch(err => {})
                        .finally(_ => this.processing = false)
                    },
                    put(form) {
                        this.submit(form, 'PUT');
                    }
                }
            }
        }
    }

    return {
        hook,
        ...methodsAccessor
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