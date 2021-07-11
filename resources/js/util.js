function _hasProperty(obj, prop) {
    const _has = Object.prototype.hasOwnProperty;

    return _has.call(obj, prop)
};