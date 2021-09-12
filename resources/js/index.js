import { _findComponentById, _hasProperty } from './helper/util';
import { _setAquaConfig } from './core/index';
import { _replicatePublicMethods } from './network/network';
import { Method, XHREvent } from './helper/types';
import { LIFECYCLE_CONFIG_NAME } from './config';

window.Aquastrap = {
    onStart(callback) {
        _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.START]]: callback});
        return this;
    },
    onSuccess(callback) {
        _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]]: callback});
        return this;
    },
    onError(callback) {
        _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.ERROR]]: callback});
        return this;
    },
    onFinish(callback) {
        _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.FINISH]]: callback});
        return this;
    }
};

window._aquaGenerate = function (id, key, componentIngredient, methods) {
    const methodsAccessor = _replicatePublicMethods(id, key, componentIngredient, methods);

    let hook = {};

    for (const [name, networkHandler] of Object.entries(methodsAccessor)) {
        hook = {
            ...hook,
            get [name]() {
                return {
                    processing: false,
                    result: null,
                    statusCode: '',
                    errors: {},
                    message: '',
                    abortController: null,
                    get hasValidationError() {
                        return ! this.processing && Object.keys(this.errors).length > 0;
                    },
                    submit(form, type = Method.POST) {
                        this.processing = true;
                        this.result = null;
                        this.statusCode = '';
                        this.errors = {};
                        this.message = '';
                        this.abortController = new AbortController();

                        networkHandler(form, type, this.abortController.signal)
                        .then(res => {
                            this.statusCode = res.status;
                            this.result = res.data;
                            this.message = _hasProperty(res.data, 'message') ? res.data.message : '';
                            this.errors = res.status === 422 && _hasProperty(res.data, 'errors') ? res.data.errors : {};
                        })
                        .catch(err => {
                            this.message = 'Network Request failed !';
                        })
                        .finally(_ => this.processing = false)
                    },
                    cancel() {
                        if(this.abortController)
                        this.abortController.abort();
                    },
                    get(form) {
                        this.submit(form, Method.GET);
                    },
                    post(form) {
                        this.submit(form, Method.POST);
                    },
                    put(form) {
                        this.submit(form, Method.PUT);
                    },
                    patch(form) {
                        this.submit(form, Method.PATCH);
                    },
                    delete(form) {
                        this.submit(form, Method.DELETE);
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
        onStart(callback) {
            _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.START]]: callback}, id);
            return this;
        },
        onSuccess(callback) {
            _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]]: callback}, id);
            return this;
        },
        onError(callback) {
            _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.ERROR]]: callback}, id);
            return this;
        },
        onFinish(callback) {
            _setAquaConfig({[LIFECYCLE_CONFIG_NAME[XHREvent.FINISH]]: callback}, id);
            return this;
        },
    }
}