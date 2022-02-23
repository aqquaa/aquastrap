# Changelog

## v2.0.0-beta.1 - 2022-02-23

### fixed
- trait property override error in php 8.1 fixed

### added
- support rate limiting - methods: `$this->rateLimit(3)` `$this->clearRateLimiter()` check `src/Traits/RateLimit.php` for complete api

### removed
- middleware apply no longer supported

## v1.0.0-beta.2 - 2022-02-22

## fixed
- missing aquastrap header fix when running in console
- no encryption using to find class ingredient ( using session as lookup store )

#### added
- added php 8.1 & Laravel 9 support

#### changed
- callable method visibily controll via - `aquaGuarded` `aquaCallable`

## v1.0.0-beta.1 - 2021-11-03

## changed
- class file `authorize` renammed to `allowed` to fix controller native `authorize` method conflict with aqua class file `authorize` method

## v0.0.10-alpha - 2021-10-09

#### added
- non json response considered as blob & auto download as file
- pest testing for notification trait

## v0.0.9-alpha - 2021-09-24

#### changed
- notification api rewritten. now support method chaining

## v0.0.8-alpha - 2021-09-17

#### added
- all states can be reset by `resetStates()`
- one or more states can be reset by `resetState('processing')` or `resetState(['processing', 'statusCode'])`
- server returned notification handle & dispatch window event `aqua.notification`

#### changed
- states now can only be accessed by `state` property e.g. state.processing

## v0.0.7-alpha - 2021-09-12

#### added
- server returned notification handle & dispatch window event `aqua.notification`

#### improvements
- notification trait separated from primary AquaSync trait & used in AquaSync
- js scripts refactor

## v0.0.6-alpha - 2021-08-31

- fix non json data response decode attempt fail catch

## v0.0.5-alpha - 2021-08-23

- fix readablestream already read / user callback passed response incorrect

## v0.0.4-alpha - 2021-08-20

- fix readablestream already read
- instead raw readable data return parsed promise from xhr success

## v0.0.3-alpha - 2021-08-20

- added xhr lifecycle callback support - `onStart`, `onFinish`

## v0.0.2-alpha - 2021-08-18

- dist assets publishable `php artisan vendor:publish --provider="Aqua\Aquastrap\AquastrapServiceProvider" --tag="assets"`

## v0.0.1-alpha - 2021-08-18

- initial release