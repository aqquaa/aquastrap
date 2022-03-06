import EventManager from './Event'
import merge from 'lodash/fp/merge';
import State from './State';
import { Method, LIFE } from './Fixed';
import { _hasFiles, _objectToFormData } from '../js/helper/util';
import { _hasProperty } from "../js/helper/util";
import NetworkRequest from "./Network";
import composeConfig from './RequestConfigure';

export default class Aquastrap {
    constructor(requestURL = 'http://localhost', userStates = [], options = {}, hooks = {}) {
        this.requestURL = requestURL

        this._stateHub = new State
        this.state = this._stateHub.state

        this._userStates = userStates // [ [name, callback], ... ]

        this.requestConfig = {options, hooks}
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
        this.requestConfig = Object.assign({}, this.requestConfig, {
            options: merge(this.requestConfig.options, userOptions)
        })

        return this
    }
    setRequestHooks(userHooks = {}) {
        this.requestConfig = Object.assign({}, this.requestConfig, {
            hooks: merge(this.requestConfig.hooks, userHooks)
        })

        return this
    }

    submit(method = Method.GET, payload = {}, config = {options: {}, hooks: {}}) {
        const _initExtraStateRegistration = (userStates, mainContext) => {
            if(userStates.length === 0) return
    
            Array.from(userStates).forEach(i => {
                if(! Array.isArray(i) || typeof i[0] === 'undefined' || typeof i[1] === 'undefined' || typeof i[1] !== "function") return
                
                Object.defineProperty(mainContext.state, i[0], {
                    get() { 
                        return i[1](mainContext.state)
                    }
                });
            })
        }
        
        this._stateHub.reset()
        this.state = {...this._stateHub.state}
        _initExtraStateRegistration(this._userStates, this)

        const EventHub = new EventManager(this._stateHub, this)

        // last moment config & hooks overwrite
        this.setRequestOptions(config.options)
        this.setRequestHooks(config.hooks)
        this.requestConfig = composeConfig(EventHub, this.requestURL, method, payload, this.requestConfig.options, this.requestConfig.hooks)

        // register internal state manager callbacks & user hooks
        EventHub.registerInternalHooks()

        EventHub.registerUserHooks(this.requestConfig.hooks)

        EventHub.run(LIFE.BEFORE, this.requestConfig.options)

        // XHR BEGIN
        NetworkRequest(EventHub, this.requestConfig.options);
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