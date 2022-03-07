import { LIFE, HOOK } from "./Fixed";
import Hook from './Hook'

const nothing = () => {};

export default class EventHub {
    constructor(stateHub, mainContext) {
        this.hook = new Hook(stateHub, mainContext)
        this.handlers = {}
    }

    registerInternalHooks() {
        this.register(LIFE.BEFORE, this.hook[HOOK.BEFORE].bind(this.hook))
        this.register(LIFE.START, this.hook[HOOK.START].bind(this.hook))
        this.register(LIFE.CANCEL, this.hook[HOOK.CANCEL].bind(this.hook))
        this.register(LIFE.UPLOAD, this.hook[HOOK.UPLOAD].bind(this.hook))
        this.register(LIFE.DOWNLOAD, this.hook[HOOK.DOWNLOAD].bind(this.hook))
        this.register(LIFE.SUCCESS, this.hook[HOOK.SUCCESS].bind(this.hook))
        this.register(LIFE.ERROR, this.hook[HOOK.ERROR].bind(this.hook))
        this.register(LIFE.FINISH, this.hook[HOOK.FINISH].bind(this.hook))
    }

    registerUserHooks(hooks) {
        const {
            onBefore = nothing,
            onStart = nothing,
            onCancel = nothing,
            onSuccess = nothing,
            onError = nothing,
            onFinish = nothing,
        } = hooks;
    
        // register user hooks
        this.register(LIFE.BEFORE, onBefore)
        this.register(LIFE.START, onStart)
        this.register(LIFE.CANCEL, onCancel)
        this.register(LIFE.SUCCESS, onSuccess)
        this.register(LIFE.ERROR, onError)
        this.register(LIFE.FINISH, onFinish)
    }

    register(event, handler) {
        if (!this.handlers) this.handlers = {};

        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }

        this.handlers[event].push(handler);
    }

    off(event, handler) {
        let handlers = this.handlers?.[event];
        if (!handlers) return;

        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);  // remember js works as reference so this will mutate this.handlers
            }
        }
    }

    run(event, ...args) {
        if (!this.handlers?.[event]) {
            return; // no handlers for that event name
        }
      
        // call the handlers
        this.handlers[event].forEach(handler => handler.apply(this, args));
    }
}