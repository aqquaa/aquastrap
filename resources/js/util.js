function _hasProperty(obj, prop) {
    const _has = Object.prototype.hasOwnProperty;

    return _has.call(obj, prop)
};

function _findComponentById(id) {
    const componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
    if(componentIndex === -1) {
        console.error('component not found', {component: id});

        throw new Error('Aquastrap component not found');
    }

    return window._aquastrap.component[componentIndex];
}