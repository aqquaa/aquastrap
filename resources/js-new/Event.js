import { LIFE } from "./Fixed";

const nothing = () => {};

export default class EventHub {
    constructor(stateHub, mainContext) {
        this.stateHub = stateHub
        this.mainContext = mainContext
        this.handlers = {}
    }

    registerInternalHooks() {
        this.register(LIFE.BEFORE, this.stateHub.onBefore.bind(this.mainContext))
        this.register(LIFE.START, this.stateHub.onStart.bind(this.mainContext))
        this.register(LIFE.CANCEL, this.stateHub.onCancel.bind(this.mainContext))
        this.register(LIFE.UPLOAD, this.stateHub.onUpload.bind(this.mainContext))
        this.register(LIFE.DOWNLOAD, this.stateHub.onDownload.bind(this.mainContext))
        this.register(LIFE.SUCCESS, this.stateHub.onSuccess.bind(this.mainContext))
        this.register(LIFE.ERROR, this.stateHub.onError.bind(this.mainContext))
        this.register(LIFE.FINISH, this.stateHub.onFinish.bind(this.mainContext))
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