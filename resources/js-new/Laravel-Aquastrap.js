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
                this.localState.errors = response?.data?.errors || {}

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
    
    hasFormError(field) {

    }

    setFormError() {

    }

    clearFormError() {

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