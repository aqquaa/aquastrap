import { LIFECYCLE_CONFIG_NAME } from './config';
import { XHREvent } from './helper/types';

window._aquastrap =  window._aquastrap || {
    component: [
        {
            id: '',
            config: {}
        }
    ],
    config: {
        [LIFECYCLE_CONFIG_NAME[XHREvent.START]]: () => {}, 
        [LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]]: () => {}, 
        [LIFECYCLE_CONFIG_NAME[XHREvent.ERROR]]: () => {}, 
        [LIFECYCLE_CONFIG_NAME[XHREvent.FINISH]]: () => {}
    }
};