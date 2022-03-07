import { HOOK_NAME } from './Fixed';
import axios from 'axios';

export default function (HookHub, options) {
    HookHub.run(HOOK_NAME.START, options)

    axios(options)
    .then((response) => {
        HookHub.run(HOOK_NAME.STATUS_CODE, response.status)
        HookHub.run(HOOK_NAME.SUCCESS, response)

        console.log(response);
    })
    .catch((error) => {
        error.response && HookHub.run(HOOK_NAME.STATUS_CODE, error.response.status)

        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        }

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    })
    .then(_ => HookHub.run(HOOK_NAME.FINISH, {}))
}
