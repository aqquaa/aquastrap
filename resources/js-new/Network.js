import { LIFE } from './Fixed';
import axios from 'axios';

export default function (EventHub, options) {
    console.log(options);

    EventHub.run(LIFE.START, options)

    axios(options)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);

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
    .then(_ => EventHub.run(LIFE.FINISH, {}))
}
