import { _hasProperty } from '../helper/util';
import { notify } from '../notify/index';
import { execLifecycleCallback } from './lifecycleHook';

export function processResponseHeader(response, id, key) {
    const component = { id, key };
    const process = handle(response, component);

    process.notification();
}

export function isJsonResponse(response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return true;
    }

    return false;
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