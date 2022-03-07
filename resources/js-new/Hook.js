import { HOOK_NAME, PUBLIC_EVENTS } from './Fixed'
import { dispatch } from '../js/helper/util'

export default class Hook {
    constructor(stateHub, mainContext) {
        this.stateHub = stateHub
        this.mainContext = mainContext
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
        // USEFUL FOR USERS TO HOOK INTO
    }

    [HOOK_NAME.SUCCESS](response) {
        dispatch(PUBLIC_EVENTS.SUCCESS, response)

        this.stateHub[HOOK_NAME.SUCCESS].call(this.mainContext, response)
    }

    [HOOK_NAME.CANCEL](options) {
        dispatch(PUBLIC_EVENTS.CANCEL, options)

        this.stateHub[HOOK_NAME.CANCEL].call(this.mainContext)
    }

    [HOOK_NAME.UPLOAD](progress) {
        dispatch(PUBLIC_EVENTS.UPLOAD, progress)

        this.stateHub[HOOK_NAME.UPLOAD].call(this.mainContext)
    }

    [HOOK_NAME.DOWNLOAD](progress) {
        dispatch(PUBLIC_EVENTS.DOWNLOAD, progress)

        this.stateHub[HOOK_NAME.DOWNLOAD].call(this.mainContext)
    }

    [HOOK_NAME.ERROR](options) {
        dispatch(PUBLIC_EVENTS.ERROR, options)

        this.stateHub[HOOK_NAME.ERROR].call(this.mainContext)
    }

    [HOOK_NAME.FINISH]() {
        dispatch(PUBLIC_EVENTS.FINISH, {})

        this.stateHub[HOOK_NAME.FINISH].call(this.mainContext)
    }
}