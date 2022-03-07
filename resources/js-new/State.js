import { _hasProperty } from "../js/helper/util";
import { HOOK_NAME } from './Fixed'

export default class State {
    constructor() {
        this.state = {...this._initialState()}
    }

    _initialState() {
        return {
            busy: false,
            result: null,
            statusCode: null,
            errors: {},
            message: '',
            downloadProgress: 0,
            uploadProgress: 0,
        }
    }

    reset() {
        this.state = {...this._initialState()}
    }

    get hasValidationError() {
        return ! this.state.busy && Object.keys(this.state.errors).length > 0
    }

    [HOOK_NAME.BEFORE]() {
        
    }

    [HOOK_NAME.START]() {
        this.state.busy = true
    }

    [HOOK_NAME.SUCCESS](response) {
        this.state.busy = false

        console.log('from state', response);
    }

    [HOOK_NAME.CANCEL]() {
        
    }

    [HOOK_NAME.UPLOAD](progress) {
        if(!_hasProperty(progress, 'total') || !_hasProperty(progress, 'loaded')) return

        let percentage = Math.round((progress.loaded / progress.total) * 100);

        console.log(percentage);
    }

    [HOOK_NAME.DOWNLOAD](progress) {
        if(!_hasProperty(progress, 'total') || !_hasProperty(progress, 'loaded')) return

        let percentage = Math.round((progress.loaded / progress.total) * 100);

        console.log(percentage);
    }

    [HOOK_NAME.ERROR]() {
        
    }

    [HOOK_NAME.FINISH]() {
        
    }
}