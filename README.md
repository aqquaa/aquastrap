# Laravel Aquastrap

> NOT YET READY

### Config
add `@aquasync` at the bottom of `<head>`
```html
<html>
  <head>
      ...
      @aquasync
  </head>
    ...
</html>
```

### Usage

#### From Component Blade View

```html
@aqua($drips).delete({id: 1})

@aquaconfig($drips).onSuccess()..

{{ $aquaroute('delete') }}
```

#### JS

```javascript
Aquastrap.onSuccess((res) => console.info('successful', res)).onError((err) => console.warn('something went wrong', err));
Aquastrap.component('profile').saveUser({id: 1, 'fname': 'rav'})
Aquastrap.component('cart').routes.delete
Aquastrap.component('cart').onSuccess()..
```

### Examples
all examples can be found [here](https://github.com/devsrv/aquastrap-example/blob/master/resources/views/components/article.blade.php)

## 👋🏼 Say Hi! 
Leave a ⭐ if you find this package useful 👍🏼,
don't forget to let me know in [Twitter](https://twitter.com/srvrksh)  
