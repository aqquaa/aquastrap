import { observable, observe } from '@nx-js/observer-util';
import { _findComponentById, _hasProperty } from './helper/util';
import { _setAquaConfig } from './core/index';
import { _replicatePublicMethods } from './network/network';
import { Method, XHREvent } from './helper/types';
import { LIFECYCLE_CONFIG_NAME } from './config';
import { reactivityManager, initialState, setState } from './core/state';

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
    },
    onNotification(callback) {
        _setAquaConfig({[LIFECYCLE_CONFIG_NAME.notification]: callback});
        return this;
    },
};

/**
 * id: the component class identifier 
 * key: the component instance indentifier
 */
window._aquaGenerate = function (id, key, componentIngredient, methods) {
    const methodsAccessor = _replicatePublicMethods(id, key, componentIngredient, methods);

    return {
        hook: resolveHooks(id, key, methodsAccessor),
        ...methodsAccessor
    }
}

function resolveHooks(id, key, methodsAccessor) {
    let hooks = {};

    for (const [name, networkHandler] of Object.entries(methodsAccessor)) {
        hooks = {
            ...hooks,
            get [name]() {
                return createHook(reactivityManager({id, key}, name), networkHandler);
            }
        }
    }

    return hooks;
}

function createHook(reactivity, networkHandler) {
    reactivity.initStates();

    return {
        reactiveState: reactivity.getStates(),
        state: {...initialState},
        submit(form, type = Method.POST) {
            setState(reactivity, this, {
                processing: true,
                result: null,
                statusCode: '',
                errors: {},
                message: '',
                notification: {type: '', message: ''},
                abortController: new AbortController()
            });

            networkHandler(form, type, this.state.abortController.signal)
            .then(res => {
                setState(reactivity, this, {
                    statusCode: res.status,
                    result: res.data,
                    errors: res.status === 422 && _hasProperty(res.data, 'errors') ? res.data.errors : {},
                    message: _hasProperty(res.data, 'message') ? res.data.message : '',
                });
            })
            .catch(err => {
                setState(reactivity, this, {
                    message: 'Network Request failed !'
                });
            })
            .finally(_ => {
                setState(reactivity, this, {
                    processing: false
                });
            })
        },
        cancel() {
            if(this.state.abortController)
            this.state.abortController.abort();
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
    };
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
        onNotification(callback) {
            _setAquaConfig({[LIFECYCLE_CONFIG_NAME.notification]: callback}, id);
            return this;
        },
    }
}