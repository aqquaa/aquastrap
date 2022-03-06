import { _hasProperty } from "../js/helper/util";

export default class State {
    constructor() {
        this.state = {...this.initialState()}
    }

    initialState() {
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
        this.state = {...this.initialState()}
    }

    get hasValidationError() {
        return ! this.state.busy && Object.keys(this.state.errors).length > 0
    }

    onBefore() {
        
    }

    onStart() {
        this.state.busy = true

        console.log(this.state);
    }

    onCancel() {
        
    }

    onUpload(progress) {
        if(!_hasProperty(progress, 'total') || !_hasProperty(progress, 'loaded')) return

        let percentage = Math.round((progress.loaded / progress.total) * 100);

        console.log(percentage);
    }

    onDownload(progress) {
        if(!_hasProperty(progress, 'total') || !_hasProperty(progress, 'loaded')) return

        let percentage = Math.round((progress.loaded / progress.total) * 100);

        console.log(percentage);
    }

    onSuccess() {
        
    }

    onError() {
        
    }

    onFinish() {
        
    }
}