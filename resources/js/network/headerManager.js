import { _hasProperty } from '../helper/util';
import { notify } from '../notify/index';

export default function processResponseHeader(response) {
    const process = handle(response);

    process.notification();
}

function handle(response) {
    return {
        notification() {
            const notification = response.headers.get('X-Aqua-Notification');
    
            if(! notification) return;

            const parsed = JSON.parse(notification);

            if (parsed && _hasProperty(parsed, 'type') && _hasProperty(parsed, 'message')) {
                notify(parsed);
            }
        }
    }
}