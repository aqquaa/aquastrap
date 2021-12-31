<?php

use Aqua\Aquastrap\Contracts\DependencyLookupStore;
use Aqua\Aquastrap\DepsLookup\SessionStore;
use Aqua\Aquastrap\IngredientStore;
use Illuminate\Support\Facades\Session;

beforeEach(fn () => app()->instance(DependencyLookupStore::class, new SessionStore()));

it('stores and fetches data', function () {
    $key = md5('random');
    $value = ['green', 'blue'];

    IngredientStore::set($key, $value);

    $stored = IngredientStore::get($key);

    expect($stored)->toMatchArray($value);
});

it('the key is prefixed with an unique id for the current user only', function () {
    $key = md5('random');
    $value = ['green', 'blue'];

    IngredientStore::set($key, $value);

    $prefix = '_aqua';
    $uniqueId = Session::getId();

    $stored = session("$prefix$uniqueId.$key");

    expect($stored)->toMatchArray($value);
});
