import { _hasProperty, _isObjEmpty, mimeTypeToExt, dispatch } from "../js/helper/util";
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
        .mergeRequestOptions({
            headers: {
                ...(
                    document.querySelector('meta[name="csrf-token"]') &&
                    {
                        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                    }
                )
            },
            responseType: 'blob'
        })
        .setRequestHooks({
            onBefore: this.resetStates.bind(this),
            onSuccess: async (res) => {
                _processResponse(res, this.localState)

                _handleBlobResponse(res)
            },
            onError: async (res) => {
                let response = _processResponse(res, this.localState)
                if(! response) return

                if(response?.errors) {
                    let keyed = {}

                    Object.entries(response.errors)
                    .forEach(([field, msg]) => keyed[field] = msg[0])

                    this.localState.errors = keyed
                }
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

const _isJsonResponse = (response) => {
    const contentType = response.headers['content-type'];
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return true;
    }

    return false;
}

function _handleBlobResponse(response) {
    if(_isJsonResponse(response)) return

    const defaultMime = "application/octet-stream";
    const contentType = response.headers["content-type"] || defaultMime;
    const contentDisposition = response.headers['content-disposition'];

    const suppliedFilename = contentDisposition ? contentDisposition.split('filename=')[1] : '';

    const filename = suppliedFilename !== '""' 
                    ? suppliedFilename.replace(/\s+/g, '-').replace(/\"/g, '')
                    : 'download' + mimeTypeToExt(contentType.split(';')[0]);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    return;
}

async function _processResponse(response, stateHandler) {
    const _notifiy = (response) => {
        const notification = response?.headers['x-aqua-notification'];
    
        if(! notification) return;
    
        const parsed = JSON.parse(notification);
    
        if (parsed && _hasProperty(parsed, 'type') && _hasProperty(parsed, 'message')) {
            dispatch('aqua.notification', parsed);
        }
    }

    const _formatResponse = async(res) => {
        if(! res?.data) return null
    
        let response = res.data
        if(response instanceof Blob && response.type === 'application/json') {
            let raw = await response.text()
            response = JSON.parse(raw)
            return response
        }
    
        return response
    }

    _notifiy(response)

    if(response instanceof Error) {
        stateHandler.message = response.message
        return null
    }
    
    let res = await _formatResponse(response)
    if(! res) return null

    stateHandler.message = res?.message
    stateHandler.message ||= ''

    return res
}