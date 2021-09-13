import { observable, observe } from '@nx-js/observer-util';
import { _hasProperty, _findComponentById } from './../helper/util';

export function reactivityManager({id, key}, method) {
    return {
        boot() {
            let componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
            if(componentIndex === -1) {
                _aquaCore.createNewComponent(id);

                return window._aquastrap.component.findIndex(c => c.id === id);
            }

            return componentIndex;
        },
        initStates() {
            const componentIndex = this.boot();

            const componentItem = window._aquastrap.component[componentIndex];

            const stateItemIndex = componentItem.states.findIndex(s => s.key === key && s.method === method);
            if(stateItemIndex !== -1) {
                return;
            }

            const modify = {
                ...componentItem,
                states: [...componentItem.states, {
                    key: key,
                    method: method,
                    state: observable({
                        processing: false,
                        result: null,
                        statusCode: '',
                        errors: {},
                        message: '',
                        notification: {type: '', message: ''},
                        abortController: null,
                        get hasValidationError() {
                            return ! this.processing && Object.keys(this.errors).length > 0;
                        }
                    })
                }]
            };

            window._aquastrap.component = [
                ...window._aquastrap.component.slice(0, componentIndex),
                modify,
                ...window._aquastrap.component.slice(componentIndex + 1)
            ];
        },
        getStates() {
            const component = _findComponentById(id);
            const stateItemIndex = component.states.findIndex(s => s.key === key && s.method === method);
            if(stateItemIndex === -1) {
                throw new Error('Aquastrap component state not found');
            }

            return component.states[stateItemIndex].state;
        },
        setState(newState) {
            const currState = this.getStates();

            for (const [state, value] of Object.entries(newState)) {
                currState[state] = value;
            }
        }
    }
}

export const initialState = {
    processing: false,
    result: null,
    statusCode: '',
    errors: {},
    message: '',
    notification: {type: '', message: ''},
    abortController: null,
    get hasValidationError() {
        return ! this.processing && Object.keys(this.errors).length > 0;
    } 
}

function reducer(action, payload) {
    switch (action) {
        case 'SUCCESS':
            const { status, data } = payload;
            return {
                statusCode: status,
                result: data,
                errors: status === 422 && _hasProperty(data, 'errors') ? data.errors : {},
                message: _hasProperty(data, 'message') ? data.message : '',
            };

        case 'ERROR':
            return {
                message: 'Network Request failed !'
            };

        case 'FINALLY':
            return {
                processing: false
            };
    
        default:
            return {
                processing: true,
                result: null,
                statusCode: '',
                errors: {},
                message: '',
                notification: {type: '', message: ''},
                abortController: new AbortController()
            };
    }
}

export function dispatch(action, payload, context, reactivity) {
    const state = reducer(action, payload);

    setState(reactivity, context, state);
}

export function setState(reactivity, context, newState) {
    const currReactiveState = reactivity.getStates();

    for (const [state, value] of Object.entries(newState)) {
        context.state[state] = value;
        currReactiveState[state] = value;
    }
}