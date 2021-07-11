# Laravel Aquastrap

### Usage

#### From Component Blade View

```html
@aqua($drips).delete()

@aquaconfig($drips).onSuccess()..

{{ $aquaroute('delete') }}
```

#### JS

```javascript
Aquastrap.onSuccess((res) => console.info('successful', res)).onError((err) => console.warn('something went wrong', err));
Aquastrap.component('cart').saveUser({id: 1})
Aquastrap.component('cart').routes.delete
Aquastrap.component('cart').onSuccess()..
```

## 👋🏼 Say Hi! 
Leave a ⭐ if you find this package useful 👍🏼,
don't forget to let me know in [Twitter](https://twitter.com/srvrksh)  
