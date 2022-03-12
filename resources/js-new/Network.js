import { HOOK_NAME } from './Fixed';
import axios from 'axios';

export default function (HookHub, options) {
    HookHub.run(HOOK_NAME.START, options)

    axios(options)
    .then(response => {
        HookHub.run(HOOK_NAME.STATUS_CODE, response.status)
        HookHub.run(HOOK_NAME.SUCCESS, response)
    })
    .catch(error => {
        if (axios.isCancel(error)) {
            HookHub.run(HOOK_NAME.CANCEL, error.message)
            return
        }

        if(error.response) {
            HookHub.run(HOOK_NAME.STATUS_CODE, error.response.status)
            HookHub.run(HOOK_NAME.ERROR, error.response)
            return
        }

        HookHub.run(HOOK_NAME.ERROR, error)
    })
    .then(_ => HookHub.run(HOOK_NAME.FINISH, {}))
}