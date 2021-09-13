import { _hasProperty } from '../helper/util';
import { notify } from '../notify/index';
import { execLifecycleCallback } from './lifecycleHook';

export default function processResponseHeader(response, id, key) {
    const component = { id, key };
    const process = handle(response, component);

    process.notification();
}

function handle(response, component) {
    return {
        notification() {
            const notification = response.headers.get('X-Aqua-Notification');
    
            if(! notification) return;

            const parsed = JSON.parse(notification);

            if (parsed && _hasProperty(parsed, 'type') && _hasProperty(parsed, 'message')) {
                notify(parsed, component);

                execLifecycleCallback(component.id, 'notification', parsed);
            }
        }
    }
}