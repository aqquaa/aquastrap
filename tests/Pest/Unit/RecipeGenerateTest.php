<?php

use Aqua\Aquastrap\IngredientManager;
use Aqua\Aquastrap\IngredientStore;
use Aqua\Aquastrap\Recipe;
use Aqua\Aquastrap\Tests\Pest\ExampleClass;

it('generate recipe for an instance with proper keys', function () {
    $recipe = (new Recipe)(new ExampleClass('test'));

    expect($recipe)->toHaveKeys(['id', 'key', 'ingredient', 'methods']);
});

test('recipe consists id as component class checksum', function () {
    $instance = new ExampleClass('test');
    $recipe = (new Recipe)($instance);

    expect($recipe)->id->toEqual(md5(get_class($instance)));
});

test('returns proper ingredient store key', function () {
    $instance = new ExampleClass('test');
    $recipe = (new Recipe)($instance);

    [$expectedKey] = (new IngredientManager())->generate($instance);

    expect($recipe)->ingredient->toEqual($expectedKey);
});

test('returns only the callable allowed methods', function () {
    $instance = new ExampleClass('test');
    $recipe = (new Recipe)($instance);

    expect($recipe)->methods->toHaveCount(2)->toMatchArray([1 => 'pubMet', 2 => 'anotherPubMet']);
});

test('stores proper ingredient with key', function () {
    $instance = new ExampleClass('test');

    (new Recipe)($instance);

    [$ingredientKey] = (new IngredientManager())->generate($instance);

    IngredientStore::get($ingredientKey);

    expect(IngredientStore::get($ingredientKey))->toHaveCount(2)->toHaveKeys(['class', 'dependencies']);
});
