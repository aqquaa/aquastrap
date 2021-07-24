window._aquastrap =  window._aquastrap || {
    component: [
        {
            id: 'article',
            routes: {
                "update": "http://192.168.0.100:8000/articles/foo/update",
                "delete": "http://192.168.0.100:8000/articles/foo/delete"
            },
            config: {}
        },
        {
            id: 'post',
            routes: {
                "delete": "http://192.168.0.100:8000/aquastrap/145b16fffaf48b09d39c7339d77c3ae6/delete"
            },
            config: {}
        },
        {
            id: 'folder.my-component',
            routes: {
                "delete": "http://192.168.0.100:8000/mycomponent/foo/delete"
            },
            config: {}
        }
    ],
    config: {success: () => {}, error: () => {}}
};