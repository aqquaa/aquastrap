import { _hasProperty, _findComponentById } from './../helper/util';
import { XHREvent } from './../helper/types';
import { LIFECYCLE_CONFIG_NAME } from './../config';

window._aquaCore = {
    createNewComponent(id) {
        window._aquastrap.component = [
            ...window._aquastrap.component,
            {
                id: id, 
                config: {},
                states: []
            }
        ];
    },
    setComponentMeta(id, { prop, value }) {
        const componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
        const componentItem = window._aquastrap.component[componentIndex];

        let modify = null;

        switch (prop) {
            case 'config':
                modify = {
                    ...componentItem,
                    config: Object.assign({}, componentItem.config, { 
                        ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.START])   &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.START]]:     value[LIFECYCLE_CONFIG_NAME[XHREvent.START]]} ), // ...( _hasProperty(value, 'start')   &&  {start: value.start} )
                        ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]) &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]]:   value[LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]]} ),
                        ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.ERROR])   &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.ERROR]]:     value[LIFECYCLE_CONFIG_NAME[XHREvent.ERROR]]} ),
                        ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.FINISH])  &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.FINISH]]:    value[LIFECYCLE_CONFIG_NAME[XHREvent.FINISH]]} ),
                        ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME.notification)      &&  {[LIFECYCLE_CONFIG_NAME.notification]:        value[LIFECYCLE_CONFIG_NAME.notification]} ),
                    })
                }

                break;
        
            default:
                break;
        }

        window._aquastrap.component = [
            ...window._aquastrap.component.slice(0, componentIndex),
            modify,
            ...window._aquastrap.component.slice(componentIndex + 1)
        ];
    },
    setGlobalConfig({ prop, value }) {
        switch (prop) {
            case 'config':
                window._aquastrap.config = {
                    ...window._aquastrap.config,
                    ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.START])   &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.START]]:      value[LIFECYCLE_CONFIG_NAME[XHREvent.START]]} ),
                    ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]) &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]]:    value[LIFECYCLE_CONFIG_NAME[XHREvent.SUCCESS]]} ),
                    ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.ERROR])   &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.ERROR]]:      value[LIFECYCLE_CONFIG_NAME[XHREvent.ERROR]]} ),
                    ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME[XHREvent.FINISH])  &&  {[LIFECYCLE_CONFIG_NAME[XHREvent.FINISH]]:     value[[LIFECYCLE_CONFIG_NAME[XHREvent.FINISH]]]} ),
                    ...( _hasProperty(value, LIFECYCLE_CONFIG_NAME.notification)      &&  {[LIFECYCLE_CONFIG_NAME.notification]:         value[LIFECYCLE_CONFIG_NAME.notification]} ),
                };

                break;
        
            default:
                break;
        }
        
    },
    /**event:  XHREvent: { START | SUCCESS | ERROR | FINISH } | notification */
    resolveLifecycleCallback(event, id) {
        const componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
        const component = componentIndex !== -1 ? window._aquastrap.component[componentIndex] : undefined;
        const globalConfig = window._aquastrap.config;

        const configProperty = LIFECYCLE_CONFIG_NAME[event];

        if(component && _hasProperty(component.config, configProperty) && typeof component.config[configProperty] === 'function') {
            return component.config[configProperty];
        }

        if(_hasProperty(globalConfig, configProperty)) {
            return globalConfig[configProperty];
        }

        return () => {};
    }
}

export function _setAquaConfig(configs, id = '') {
    if(! id) {
        _aquaCore.setGlobalConfig({ prop: 'config', value: configs });

        return;
    }

    try {
        _findComponentById(id);
    } catch (error) {
        _aquaCore.createNewComponent(id);
    }

    _aquaCore.setComponentMeta(id, { prop: 'config', value: configs });
}