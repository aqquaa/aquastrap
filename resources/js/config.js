import { XHREvent } from './helper/types';

export const LIFECYCLE_CONFIG_NAME = {
    [XHREvent.START]: 'start',
    [XHREvent.SUCCESS]: 'success',
    [XHREvent.ERROR]: 'error',
    [XHREvent.FINISH]: 'finish',
}