export function _hasProperty(obj, prop) {
    const _has = Object.prototype.hasOwnProperty;

    return _has.call(obj, prop)
};

export function _isObjEmpty(obj) {
    return obj && Object.keys(obj).length === 0
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

export function mimeTypeToExt(mime) {
    const lookup = [
        {ext: '.aac', mime: 'audio/aac'},
        {ext: '.abw', mime: 'application/x-abiword'},
        {ext: '.arc', mime: 'application/x-freearc'},
        {ext: '.avi', mime: 'video/x-msvideo'},
        {ext: '.azw', mime: 'application/vnd.amazon.ebook'},
        {ext: '.bin', mime: 'application/octet-stream'},
        {ext: '.bmp', mime: 'image/bmp'},
        {ext: '.bz', mime: 'application/x-bzip'},
        {ext: '.bz2', mime: 'application/x-bzip2'},
        {ext: '.cda', mime: 'application/x-cdf'},
        {ext: '.csh', mime: 'application/x-csh'},
        {ext: '.css', mime: 'text/css'},
        {ext: '.csv', mime: 'text/csv'},
        {ext: '.doc', mime: 'application/msword'},
        {ext: '.docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
        {ext: '.eot', mime: 'application/vnd.ms-fontobject'},
        {ext: '.epub', mime: 'application/epub+zip'},
        {ext: '.gz', mime: 'application/gzip'},
        {ext: '.gif', mime: 'image/gif'},
        {ext: '.html', mime: 'text/html'},
        {ext: '.ico', mime: 'image/vnd.microsoft.icon'},
        {ext: '.ics', mime: 'text/calendar'},
        {ext: '.jar', mime: 'application/java-archive'},
        {ext: '.jpeg', mime: 'image/jpeg'},
        {ext: '.jpg', mime: 'image/jpg'},
        {ext: '.js', mime: 'text/javascript'},
        {ext: '.json', mime: 'application/json'},
        {ext: '.jsonld', mime: 'application/ld+json'},
        {ext: '.midi', mime: 'audio/midi'},
        {ext: '.midi', mime: 'audio/x-midi'},
        {ext: '.mp3', mime: 'audio/mpeg'},
        {ext: '.mp4', mime: 'video/mp4'},
        {ext: '.mpeg', mime: 'video/mpeg'},
        {ext: '.mpkg', mime: 'application/vnd.apple.installer+xml'},
        {ext: '.odp', mime: 'application/vnd.oasis.opendocument.presentation'},
        {ext: '.ods', mime: 'application/vnd.oasis.opendocument.spreadsheet'},
        {ext: '.odt', mime: 'application/vnd.oasis.opendocument.text'},
        {ext: '.oga', mime: 'audio/ogg'},
        {ext: '.ogv', mime: 'video/ogg'},
        {ext: '.ogx', mime: 'application/ogg'},
        {ext: '.opus', mime: 'audio/opus'},
        {ext: '.otf', mime: 'font/otf'},
        {ext: '.png', mime: 'image/png'},
        {ext: '.pdf', mime: 'application/pdf'},
        {ext: '.php', mime: 'application/x-httpd-php'},
        {ext: '.ppt', mime: 'application/vnd.ms-powerpoint'},
        {ext: '.pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'},
        {ext: '.rar', mime: 'application/vnd.rar'},
        {ext: '.rtf', mime: 'application/rtf'},
        {ext: '.sh', mime: 'application/x-sh'},
        {ext: '.svg', mime: 'image/svg+xml'},
        {ext: '.swf', mime: 'application/x-shockwave-flash'},
        {ext: '.tar', mime: 'application/x-tar'},
        {ext: '.tiff', mime: 'image/tiff'},
        {ext: '.ts', mime: 'video/mp2t'},
        {ext: '.ttf', mime: 'font/ttf'},
        {ext: '.txt', mime: 'text/plain'},
        {ext: '.vsd', mime: 'application/vnd.visio'},
        {ext: '.wav', mime: 'audio/wav'},
        {ext: '.weba', mime: 'audio/webm'},
        {ext: '.webm', mime: 'video/webm'},
        {ext: '.webp', mime: 'image/webp'},
        {ext: '.woff', mime: 'font/woff'},
        {ext: '.woff2', mime: 'font/woff2'},
        {ext: '.xhtml', mime: 'application/xhtml+xml'},
        {ext: '.xls', mime: 'application/vnd.ms-excel'},
        {ext: '.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
        {ext: '.xml', mime: 'application/xml'},
        {ext: '.xul', mime: 'application/vnd.mozilla.xul+xml'},
        {ext: '.zip', mime: 'application/zip'},
        {ext: '.3gp', mime: 'video/3gpp'},
        {ext: '.7z', mime: 'application/x-7z-compressed'}
    ];

    const match = lookup.find(item => item.mime === mime);

    if(match) { return match.ext; }

    return '.txt';
}

export function dispatch(name, detail = {}) {
    document.dispatchEvent(
        new CustomEvent(name, {
            detail,
            bubbles: true,
            composed: true,
            cancelable: true,
        })
    )
}