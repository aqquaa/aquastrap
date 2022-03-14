import HookHubService from './HookHub'
import merge from 'lodash/fp/merge';
import { Method, HOOK_NAME, PUBLIC_EVENTS, STATE } from './Fixed';
import { _hasFiles, _objectToFormData, _isObjEmpty } from './helper/util';
import { _hasProperty } from "./helper/util";
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
    
    mergeRequestOptions(userOptions = {}) {
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

    submit(method = Method.GET, payload = {}, config = {}) {
        const {options = {}, hooks = {}} = config

        /**PRE-HOOK SETUP STAGE */
        this.resetStates()

        // cancel token inject if not provided
        const injected = _injectCancelSignal(options)
        this._cancelToken = injected.abortControllerInstance

        // last moment config & hooks
        const finalRqstConfig = Object.assign({}, merge(this.requestConfig, injected.options))
        const finalHooks = _isObjEmpty(hooks) ? [...this.hooks] : [...this.hooks, hooks]

        const HookHub = new HookHubService(this)
        
        const composedConfig = _composeConfig(HookHub, this.requestURL, method, payload, finalRqstConfig) // compose the final config

        HookHub.registerInternalHooks()
        HookHub.registerUserHooks(finalHooks)

        /**REALM OF HOOKS BEGIN */
        HookHub.run(HOOK_NAME.BEFORE, composedConfig)

        // XHR BEGIN
        NetworkRequest(HookHub, composedConfig);
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
}