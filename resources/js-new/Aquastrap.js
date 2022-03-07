import HookHubService from './HookHub'
import StateHubService from './State';
import merge from 'lodash/fp/merge';
import { Method, HOOK_NAME, PUBLIC_EVENTS } from './Fixed';
import { _hasFiles, _objectToFormData } from '../js/helper/util';
import { _hasProperty } from "../js/helper/util";
import NetworkRequest from "./Network";
import composeConfig from './RequestConfigure';

export default class Aquastrap {
    constructor(requestURL = 'http://localhost', userStates = [], options = {}, hooks = {}) {
        this.requestURL = requestURL

        this.state = Object.assign({}, (new StateHubService)._initialState())

        this._userStates = userStates // [ [name, callback], ... ]

        this.requestConfig = options
        this.hooks = hooks

        this.availableHooks = Array.from(Object.values(HOOK_NAME))
        this.availableEvents = Array.from(Object.values(PUBLIC_EVENTS))
    }

    url(fullUrl) {
        this.requestURL = fullUrl
        return this
    }

    route(name, ...params) {
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
    setRequestHooks(userHooks = {}) {
        this.hooks = Object.assign({}, merge(this.hooks, userHooks))

        return this
    }

    submit(method = Method.GET, payload = {}, config = {options: {}, hooks: {}}) {
        const _initExtraStateRegistration = (userStates, mainContext) => {
            if(userStates.length === 0) return
    
            Array.from(userStates).forEach(i => {
                let stateName = i[0]
                let stateEvaluator = i[1]

                if(! Array.isArray(i) || typeof stateName === 'undefined' || typeof stateEvaluator === 'undefined' || typeof stateEvaluator !== "function" || _hasProperty(mainContext.state, stateName)) return
                
                Object.defineProperty(mainContext.state, stateName, {
                    get() { 
                        return stateEvaluator(mainContext.state)
                    }
                });
            })
        }

        const stateHub = new StateHubService
        this.state = Object.assign({}, stateHub.state)

        // register user provided states to main context
        _initExtraStateRegistration(this._userStates, this)

        const HookHub = new HookHubService(stateHub, this)

        // last moment config & hooks overwrite
        this.setRequestOptions(config.options)
        this.setRequestHooks(config.hooks)
        this.requestConfig = composeConfig(HookHub, this.requestURL, method, payload, this.requestConfig)

        // register internal state manager callbacks & user hooks
        HookHub.registerInternalHooks()

        HookHub.registerUserHooks(this.hooks)

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

    }
}