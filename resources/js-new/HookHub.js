import { _hasProperty } from "../js/helper/util";
import { HOOK_NAME } from "./Fixed";
import Hook from './Hook'

export default class HookHub {
    constructor(mainContext) {
        this.hook = new Hook(mainContext)
        this.handlers = {}
    }

    registerInternalHooks() {
        const H = HOOK_NAME

        this.register(H.BEFORE,     this.hook[H.BEFORE].bind(this.hook))
        this.register(H.START,      this.hook[H.START].bind(this.hook))
        this.register(H.STATUS_CODE, this.hook[H.STATUS_CODE].bind(this.hook))
        this.register(H.CANCEL,     this.hook[H.CANCEL].bind(this.hook))
        this.register(H.UPLOAD,     this.hook[H.UPLOAD].bind(this.hook))
        this.register(H.DOWNLOAD,   this.hook[H.DOWNLOAD].bind(this.hook))
        this.register(H.SUCCESS,    this.hook[H.SUCCESS].bind(this.hook))
        this.register(H.ERROR,      this.hook[H.ERROR].bind(this.hook))
        this.register(H.FINISH,     this.hook[H.FINISH].bind(this.hook))
    }

    registerUserHooks(hooks) {
        const H = HOOK_NAME 
        Object.values(HOOK_NAME).forEach(NAME => { if(! _hasProperty(hooks, NAME)) hooks[NAME] = () => {/*NOTHING*/} })
    
        this.register(H.BEFORE,     hooks[H.BEFORE])
        this.register(H.START,      hooks[H.START])
        this.register(H.STATUS_CODE, hooks[H.STATUS_CODE])
        this.register(H.CANCEL,     hooks[H.CANCEL])
        this.register(H.UPLOAD,     hooks[H.UPLOAD])
        this.register(H.DOWNLOAD,   hooks[H.DOWNLOAD])
        this.register(H.SUCCESS,    hooks[H.SUCCESS])
        this.register(H.ERROR,      hooks[H.ERROR])
        this.register(H.FINISH,     hooks[H.FINISH])
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