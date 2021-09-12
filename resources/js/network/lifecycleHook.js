export function execLifecycleCallback(id, type, data) {
    _aquaCore.resolveLifecycleCallback(type, id)(data);
}