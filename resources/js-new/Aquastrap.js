import HookHubService from './HookHub'
import merge from 'lodash/fp/merge';
import { Method, HOOK_NAME, PUBLIC_EVENTS, STATE } from './Fixed';
import { _hasFiles, _objectToFormData, _isObjEmpty } from '../js/helper/util';
import { _hasProperty } from "../js/helper/util";
import NetworkRequest from "./Network";
import { _composeConfig, _injectCancelSignal } from './RequestConfigure';

export default class Aquastrap {
    constructor(requestURL = 'http://localhost', userStates = [], options = {}, hooks = {}) {
        this.requestURL = requestURL

        this.state = {}

        this._userStates = userStates // [ [name, callback], ... ]

        this.requestConfig = options
        this.hooks = _isObjEmpty(hooks) ? [] : [hooks]

        this._cancelToken = null

        this.availableHooks = Array.from(Object.values(HOOK_NAME))
        this.availableEvents = Array.from(Object.values(PUBLIC_EVENTS))
        this.availableAquastrapEvents = this.availableEvents.map(e => e.split(':')[1].substring(2))  // aquastrap:onStart -> start

        // initial states assign & register user provided states
        this.resetStates()  // this is useful because the user may be expecting the state to be available before the request begins
    }
    
    // expect userStates = [ [name, callback], ... ]
    _registerUserStates() {
        if(this._userStates.length === 0) return
        const mainContext = this

        const validOnly = i =>  Array.isArray(i) || typeof i[0] !== 'undefined' || typeof i[1] === "function"

        Array.from(this._userStates).filter(validOnly).forEach(i => {
            let stateName = i[0]
            let stateEvaluator = i[1]

            _hasProperty(mainContext.state, stateName) && delete mainContext.state[stateName]
            
            Object.defineProperty(mainContext.state, stateName, {
                get() { 
                    return stateEvaluator(mainContext.state)
                },
                configurable: true,
            });
        })
    }

    url(fullUrl) {
        this.requestURL = fullUrl
        return this
    }

    registerStates(list) { 
        this._userStates = this._userStates.length === 0 ? list : [...this._userStates, ...list]

        return this
    }
    
    setRequestOptions(userOptions = {}) {
        this.requestConfig = Object.assign({}, merge(this.requestConfig, userOptions))

        return this
    }
    // always overwrite all hooks callbacks
    setRequestHooks(userHooks = {}) {
        this.hooks = [Object.assign({}, userHooks)]

        return this
    }
    mergeRequestHooks(userHooks = {}) {
        this.hooks = [...this.hooks, userHooks]

        return this
    }

    submit(method = Method.GET, payload = {}, config = {options: {}, hooks: {}}) {
        /**PRE-HOOK SETUP STAGE */
        this.resetStates()

        // cancel token inject if not provided
        const injected = _injectCancelSignal(config.options)
        config.options = injected.options
        this._cancelToken = injected.abortControllerInstance

        // last moment config & hooks overwrite
        this.setRequestOptions(config.options)
        _isObjEmpty(config.hooks) || this.mergeRequestHooks(config.hooks)

        const HookHub = new HookHubService(this)
        
        this.requestConfig = _composeConfig(HookHub, this.requestURL, method, payload, this.requestConfig) // compose the final config

        HookHub.registerInternalHooks()
        HookHub.registerUserHooks(this.hooks)

        /**REALM OF HOOKS BEGIN */
        HookHub.run(HOOK_NAME.BEFORE, this.requestConfig)

        // XHR BEGIN
        NetworkRequest(HookHub, this.requestConfig);
    }
    get(payload = {}, config = {options: {}, hooks: {}}) {
        return this.submit(Method.GET, payload, config);
    }
    post(payload = {}, config = {options: {}, hooks: {}}) {
        return this.submit(Method.POST, payload, config);
    }

    cancel() {
        if(this.state.busy && this._cancelToken) {
            this._cancelToken.abort()
            this._cancelToken = null
        }
    }

    resetStates() {
        this.state = Object.assign({}, STATE)

        this._registerUserStates()
    }

    on(event, callback) {
        if(! this.availableAquastrapEvents.includes(event)) return

        const actualEvent = 'aquastrap:on' + event.charAt(0).toUpperCase() + event.slice(1)  // start -> aquastrap:onStart
        const actualCallback = (ev) => callback(ev.detail)

        document.addEventListener(actualEvent, actualCallback);

        return actualCallback
    }

    off(event, callback) {
        if(! this.availableAquastrapEvents.includes(event)) return

        const actualEvent = 'aquastrap:on' + event.charAt(0).toUpperCase() + event.slice(1)

        document.removeEventListener(actualEvent, callback);
    }
}