import { observable } from '@nx-js/observer-util';
import { _hasProperty, _findComponentById } from './../helper/util';

export function reactivityManager({id, key}, method) {
    return {
        entity: {id, key},  // useful in debugging
        boot() {
            try {
                const component = _findComponentById(id);
                if(component) return component;
            } catch (error) {
                _aquaCore.createNewComponent(id);

                return _findComponentById(id);
            }

            let componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
            if(componentIndex === -1) {
                _aquaCore.createNewComponent(id);

                return window._aquastrap.component.findIndex(c => c.id === id);
            }

            return componentIndex;
        },
        initStates() {
            const { index, component } = this.boot();

            const stateItemIndex = component.states.findIndex(s => s.key === key && s.method === method);
            if(stateItemIndex !== -1) {
                // already exists, skip
                return;
            }

            const modify = {
                ...component,
                states: [...component.states, {
                    key: key,
                    method: method,
                    state: observable({...initialState})
                }]
            };

            window._aquastrap.component = [
                ...window._aquastrap.component.slice(0, index),
                modify,
                ...window._aquastrap.component.slice(index + 1)
            ];
        },
        getStates() {
            const {index, component} = _findComponentById(id);
            const stateItemIndex = component.states.findIndex(s => s.key === key && s.method === method);
            if(stateItemIndex === -1) {
                console.error('component state missing', this.entity);
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
    abortController: null,
    get hasValidationError() {
        return ! this.processing && Object.keys(this.errors).length > 0;
    } 
}

function reducer(action, payload = {}) {
    switch (action) {
        case 'START':
            return Object.assign({}, initialState, {
                processing: true,
                abortController: new AbortController()
            });

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

        case 'RESET':
            return {...initialState};

        case 'RESET_ONLY':
            const { item } = payload;

            if(! _hasProperty(initialState, item)) { throw new Error(`invalid state item ${item}`); }

            return {
                [item]: initialState[item]
            };
    
        default:
            throw new Error();
    }
}

export function dispatch({type, payload}, context, reactivity) {
    const state = reducer(type, payload);

    setState(reactivity, context, state);
}

export function setState(reactivity, context, newState) {
    const currReactiveState = reactivity.getStates();

    for (const [state, value] of Object.entries(newState)) {
        context.state[state] = value;
        currReactiveState[state] = value;
    }
}