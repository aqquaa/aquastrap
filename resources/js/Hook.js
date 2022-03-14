import { HOOK_NAME, PUBLIC_EVENTS } from './Fixed'
import { dispatch } from './helper/util'
import StateHub from './State';

export default class Hook {
    constructor(mainContext) {
        this.mainContext = mainContext
        this.stateHub = new StateHub
    }

    [HOOK_NAME.BEFORE](options) {
        dispatch(PUBLIC_EVENTS.BEFORE, options)

        this.stateHub[HOOK_NAME.BEFORE].call(this.mainContext)
    }

    [HOOK_NAME.START](options) {
        dispatch(PUBLIC_EVENTS.START, options)

        this.stateHub[HOOK_NAME.START].call(this.mainContext, options)
    }

    [HOOK_NAME.STATUS_CODE](code) {
        this.stateHub[HOOK_NAME.STATUS_CODE].call(this.mainContext, code)
    }

    [HOOK_NAME.SUCCESS](response) {
        dispatch(PUBLIC_EVENTS.SUCCESS, response)

        this.stateHub[HOOK_NAME.SUCCESS].call(this.mainContext, response)
    }

    [HOOK_NAME.CANCEL](message) {
        dispatch(PUBLIC_EVENTS.CANCEL, message)

        this.stateHub[HOOK_NAME.CANCEL].call(this.mainContext, message)
    }

    [HOOK_NAME.UPLOAD](progress) {
        dispatch(PUBLIC_EVENTS.UPLOAD, progress)

        this.stateHub[HOOK_NAME.UPLOAD].call(this.mainContext, progress)
    }

    [HOOK_NAME.DOWNLOAD](progress) {
        dispatch(PUBLIC_EVENTS.DOWNLOAD, progress)

        this.stateHub[HOOK_NAME.DOWNLOAD].call(this.mainContext, progress)
    }

    [HOOK_NAME.ERROR](response) {
        dispatch(PUBLIC_EVENTS.ERROR, response)

        this.stateHub[HOOK_NAME.ERROR].call(this.mainContext, response)
    }

    [HOOK_NAME.FINISH]() {
        dispatch(PUBLIC_EVENTS.FINISH, {})

        this.mainContext._cancelToken = null

        this.stateHub[HOOK_NAME.FINISH].call(this.mainContext)
    }
}