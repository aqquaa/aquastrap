import { HOOK, PUBLIC_EVENTS } from './Fixed'
import { dispatch } from './../js/helper/util'

export default class Hook {
    constructor(stateHub, mainContext) {
        this.stateHub = stateHub
        this.mainContext = mainContext
    }

    [HOOK.BEFORE](options) {
        dispatch(PUBLIC_EVENTS.BEFORE, options)

        this.stateHub[HOOK.BEFORE].apply(this.mainContext)
    }

    [HOOK.START](options) {
        dispatch(PUBLIC_EVENTS.START, options)

        this.stateHub[HOOK.START].apply(this.mainContext, options)
    }

    [HOOK.CANCEL](options) {
        dispatch(PUBLIC_EVENTS.CANCEL, options)

        this.stateHub[HOOK.CANCEL].apply(this.mainContext)
    }

    [HOOK.UPLOAD](progress) {
        dispatch(PUBLIC_EVENTS.UPLOAD, progress)

        this.stateHub[HOOK.UPLOAD].apply(this.mainContext)
    }

    [HOOK.DOWNLOAD](progress) {
        dispatch(PUBLIC_EVENTS.DOWNLOAD, progress)

        this.stateHub[HOOK.DOWNLOAD].apply(this.mainContext)
    }

    [HOOK.SUCCESS](options) {
        dispatch(PUBLIC_EVENTS.SUCCESS, options)

        this.stateHub[HOOK.SUCCESS].apply(this.mainContext)
    }

    [HOOK.ERROR](options) {
        dispatch(PUBLIC_EVENTS.ERROR, options)

        this.stateHub[HOOK.ERROR].apply(this.mainContext)
    }

    [HOOK.FINISH]() {
        dispatch(PUBLIC_EVENTS.FINISH, {})

        this.stateHub[HOOK.FINISH].apply(this.mainContext)
    }
}