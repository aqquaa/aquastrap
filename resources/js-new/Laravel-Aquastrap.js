import { _hasProperty, _isObjEmpty } from "../js/helper/util";
import Aquastrap from "./Aquastrap";

const STATES = Object.freeze({
    errors: {},
    message: ''
})

export default class LaraAquastrap {
    constructor() {
        this.localState = Object.assign({}, STATES)

        this.aquastrap = new Aquastrap()

        this.aquastrap
        .setRequestHooks({
            onBefore: this.resetStates.bind(this),
            onSuccess: (response) => {
                this.localState.message = response?.data?.message || ''
            },
            onError: (response) => {
                if(response?.data?.errors) {
                    let keyed = {}

                    Object.entries(response.data.errors)
                    .forEach(([field, msg]) => keyed[field] = msg[0])

                    this.localState.errors = keyed
                }

                this.localState.message = response?.data?.message || ''
                this.localState.message ||= response instanceof Error ? response.message : ''
            }
        })
        .registerStates([
            [
                'hasError',
                state => (state.statusCode && Number(state.statusCode) >= 300) || (state.response instanceof Error)
            ]
        ])

        this.availableHooks = this.aquastrap.availableHooks
        this.availableEvents = this.aquastrap.availableEvents
    }

    get state() {
        return Object.assign({}, this.aquastrap.state, this.localState, {
            hasError: this.aquastrap.state.hasError ?? false,
            isValidationError: this.aquastrap.state.statusCode === 422 && ! this.aquastrap.state.busy && ! _isObjEmpty(this.localState.errors)
        })
    }

    setFormError(field, value = null) {
        if(field instanceof Object && typeof field === 'object') {
            this.localState.errors = Object.assign({}, this.localState.errors, field)
        }
        
        if(typeof field === 'string') {
            this.localState.errors[field] = value
        }
    }

    clearFormError(...fields) {
        if(! fields.length) {
            this.localState.errors = {}
            return
        }

        fields.forEach(f => {
            _hasProperty(this.localState.errors, f) && delete this.localState.errors[f]
        })
    }

    resetStates() {
        this.localState = Object.assign({}, STATES)
        this.aquastrap.resetStates()
    }

    url(path) {
        this.aquastrap.url(path)
        return this
    }

    route(name, ...args) {
        this.aquastrap.url('http://test.site')
        return this
    }

    cancel() {
        this.aquastrap.cancel()
    }

    on(event, callback) {
        this.aquastrap.on(event, callback)
    }

    off(event, callback) {
        this.aquastrap.off(event, callback)
    }

    get(payload = {}, config = {options: {}, hooks: {}}) {
        return this.aquastrap.get(payload, config)
    }

    post(payload = {}, config = {options: {}, hooks: {}}) {
        return this.aquastrap.post(payload, config)
    }
}