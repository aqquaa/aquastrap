export default Object.preventExtensions({
    requestURL: 'http://localhost',

    route(name) {
        // some way set requestURL
    },

    url(fullUrl) {
        this.requestURL = fullUrl
        return this
    }
})