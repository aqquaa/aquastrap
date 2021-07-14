import { _findComponentById } from './helper/util';
import { _setAquaConfig } from './core/index';
import { _replicatePublicMethods } from './network';

window.Aquastrap = {
    onSuccess(succesCallback) {
        _setAquaConfig({success: succesCallback});
        return this;
    },
    onError(errCallback) {
        _setAquaConfig({error: errCallback});
        return this;
    },
    component(id) {
        return {
            routes: _findComponentById(id).routes,
            onSuccess(succesCallback) {
                _setAquaConfig({success: succesCallback}, id);
                return this;
            },
            onError(errCallback) {
                _setAquaConfig({error: errCallback}, id);
                return this;
            },
            ..._replicatePublicMethods(_findComponentById(id).routes, id)
        }
    }
};

window._aquaGenerate = function (id) {
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

window._registerAquaConfig = function (id = '') {
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