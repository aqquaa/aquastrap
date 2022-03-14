import { _hasProperty } from "./helper/util";
import { HOOK_NAME, STATE } from './Fixed'

export default class State {
    constructor() {
        this.state = Object.assign({}, STATE)
    }

    [HOOK_NAME.BEFORE]() {
        // EVERYTHING NEEDED TO BE DONE HERE ALREADY DONE IN MAIN CONTEXT
        // LEAVE IT
    }

    [HOOK_NAME.START]() {
        this.state.busy = true
    }

    [HOOK_NAME.STATUS_CODE](code) {
        this.state.statusCode = code
    }

    [HOOK_NAME.SUCCESS](response) {
        this.state.response = response
        this.state.result = response.data
    }

    [HOOK_NAME.CANCEL](message) {
        this.state.cancelled = true
    }

    [HOOK_NAME.UPLOAD](progress) {
        let total = progress?.total
        let loaded = progress?.loaded

        if(! total || !loaded) return
        
        let percentage = Math.round((loaded / total) * 100)

        this.state.uploadProgress = percentage
    }

    [HOOK_NAME.DOWNLOAD](progress) {
        let total = progress?.total
        let loaded = progress?.loaded

        if(! total || !loaded) return
        
        let percentage = Math.round((loaded / total) * 100)

        this.state.downloadProgress = percentage
    }

    [HOOK_NAME.ERROR](response) {
        this.state.response = response
    }

    [HOOK_NAME.FINISH]() {
        this.state.busy = false
    }
}