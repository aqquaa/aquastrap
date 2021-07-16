import { Method } from './../helper/types';
import * as qs from 'qs'
import deepmerge from 'deepmerge'

export function _hasProperty(obj, prop) {
    const _has = Object.prototype.hasOwnProperty;

    return _has.call(obj, prop)
};

export function _findComponentById(id) {
    const componentIndex = window._aquastrap.component.findIndex(c => c.id === id);
    if(componentIndex === -1) {
        console.error('component not found', {component: id});

        throw new Error('Aquastrap component not found');
    }

    return window._aquastrap.component[componentIndex];
}

export function _hasFiles(data) {
    return (
        data instanceof File ||
        data instanceof Blob ||
        (data instanceof FileList && data.length > 0) ||
        (data instanceof FormData && Array.from(data.values()).some((value) => _hasFiles(value))) ||
        (typeof data === 'object' && data !== null && Object.values(data).some((value) => _hasFiles(value)))
    )
}

export function _objectToFormData(
    source,
    form = new FormData(),
    parentKey = null,
) {
    source = source || {}

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            append(form, composeKey(parentKey, key), source[key])
        }
    }

    return form
}

function composeKey(parent, key) {
    return parent ? parent + '[' + key + ']' : key
}

function append(form, key, value) {
    if (Array.isArray(value)) {
        return Array.from(value.keys()).forEach(index => append(form, composeKey(key, index.toString()), value[index]))
    } else if (value instanceof Date) {
        return form.append(key, value.toISOString())
    } else if (value instanceof File) {
        return form.append(key, value, value.name)
    } else if (value instanceof Blob) {
        return form.append(key, value)
    } else if (typeof value === 'boolean') {
        return form.append(key, value ? '1' : '0')
    } else if (typeof value === 'string') {
        return form.append(key, value)
    } else if (typeof value === 'number') {
        return form.append(key, `${value}`)
    } else if (value === null || value === undefined) {
        return form.append(key, '')
    }

    _objectToFormData(value, form, key)
}

export function hrefToUrl(href) {
    return new URL(href.toString(), window.location.toString())
}

export function _mergeDataIntoQueryString(
    method,
    href,
    data,
) {
    const hasHost = href.toString().includes('http')
    const hasAbsolutePath = hasHost || href.toString().startsWith('/')
    const hasRelativePath = !hasAbsolutePath && !href.toString().startsWith('#') && !href.toString().startsWith('?')
    const hasSearch = href.toString().includes('?') || (method === Method.GET && Object.keys(data).length)
    const hasHash = href.toString().includes('#')

    const url = new URL(href.toString(), 'http://localhost')

    if (method === Method.GET && Object.keys(data).length) {
        url.search = qs.stringify(deepmerge(qs.parse(url.search, { ignoreQueryPrefix: true }), data), {
            encodeValuesOnly: true,
            arrayFormat: 'brackets',
        })
        data = {}
    }

    return [
        [
            hasHost ? `${url.protocol}//${url.host}` : '',
            hasAbsolutePath ? url.pathname : '',
            hasRelativePath ? url.pathname.substring(1) : '',
            hasSearch ? url.search : '',
            hasHash ? url.hash : '',
        ].join(''),
        data,
    ]
}