window._aquastrap =  window._aquastrap || {
    component: [
        {
            id: 'article',
            routes: {
                "update": "http://127.0.0.1:8000/articles/foo/update",
                "delete": "http://127.0.0.1:8000/articles/foo/delete"
            },
            config: {}
        },
        {
            id: 'post',
            routes: {
                "delete": "http://127.0.0.1:8000/aquastrap/145b16fffaf48b09d39c7339d77c3ae6/delete"
            },
            config: {}
        },
        {
            id: 'folder.my-component',
            routes: {
                "delete": "http://127.0.0.1:8000/aquastrap/d5796c8780c470a876faf663ba4bf5da/delete"
            },
            config: {}
        }
    ],
    config: {success: () => {}, error: () => {}}
};

window.Aquastrap = {
    onSuccess(succesCallback) {
        _setAquaConfig({success: succesCallback});
        return this;
    },
    onError(errCallback) {
        _setAquaConfig({error: errCallback});
        return this;
    },
    component(id) {
        return {
            routes: _findComponentById(id).routes,
            onSuccess(succesCallback) {
                _setAquaConfig({success: succesCallback}, id);
                return this;
            },
            onError(errCallback) {
                _setAquaConfig({error: errCallback}, id);
                return this;
            },
            ..._replicatePublicMethods(_findComponentById(id).routes, id)
        }
    }
};

const _aquaCore = {
    createNewComponent(id) {
        window._aquastrap.component = [
            ...window._aquastrap.component,
            {
                id: id, 
                routes: {},
                config: {}
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
                        ...( _hasProperty(value, 'success') && {success: value.success} ),
                        ...( _hasProperty(value, 'error') && {error: value.error} )
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
                    ...( _hasProperty(value, 'success') && {success: value.success} ),
                    ...( _hasProperty(value, 'error') && {error: value.error} )
                };

                break;
        
            default:
                break;
        }
        
    },
    resolveSuccessCallback(id) {
        const componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
        const component = componentIndex !== -1 ? window._aquastrap.component[componentIndex] : undefined;
        const globalConfig = window._aquastrap.config;

        if(component && _hasProperty(component.config, 'success') && typeof component.config.success === 'function') {
            return component.config.success;
        }

        if(_hasProperty(globalConfig, 'success')) {
            return globalConfig.success;
        }

        return () => {};
    },
    resolveErrorCallback(id) {
        const componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
        const component = componentIndex !== -1 ? window._aquastrap.component[componentIndex] : undefined;
        const globalConfig = window._aquastrap.config;

        if(component && _hasProperty(component.config, 'error') && typeof component.config.error === 'function') {
            return component.config.error;
        }

        if(_hasProperty(globalConfig, 'error')) {
            return globalConfig.error;
        }

        return () => {};
    },
}

function _setAquaConfig(configs, id = '') {
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
