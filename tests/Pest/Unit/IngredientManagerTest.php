<?php

use Aqua\Aquastrap\ExtractDependencies;
use Aqua\Aquastrap\IngredientManager;
use Aqua\Aquastrap\Tests\Pest\ExampleClass;
use Opis\Closure\SerializableClosure;

test('ingredient consists class and dependencies', function () {
    $instance = new ExampleClass('test');
    $result = (new IngredientManager())->generate($instance);

    expect($result)->toHaveCount(2)
        ->and($result[0])->toBeString()
        ->and($result[1])
            ->toHaveCount(2)
            ->toHaveKeys(['class', 'dependencies']);
});

it('if class has no dependency then generated ingredient has empty dependency list', function () {
    class SampleClassWithoutDeps
    {
        public $prop = 'test';
    }

    $instance = new SampleClassWithoutDeps();
    $result = (new IngredientManager())->generate($instance);
    $generatedIngredient = $result[1];

    expect($generatedIngredient['dependencies'])->toHaveCount(0);
});

test('ingredient dependencies consists keys named same as instance class constructor arg names', function () {
    $instance = new ExampleClass('test');

    $result = (new IngredientManager())->generate($instance);
    $ingredient = $result[1];

    expect($ingredient)->dependencies->toHaveKeys(['argOne', 'prop']);
});

test('ingredient has proper class value', function () {
    $instance = new ExampleClass('test');
    $result = (new IngredientManager())->generate($instance);

    expect($result[1])
            ->class->toEqual(ExampleClass::class);
});

it('can generate formatted unique key for ingredients of an instance', function () {
    $instance = new ExampleClass('test');
    $result = (new IngredientManager())->generate($instance);
    $ingredient = $result[1];

    $expectedKey = md5(base64_encode(serialize($ingredient)));

    expect($result[0])->toEqual($expectedKey);
});

test('ingredient dependencies are serialized', function () {
    $instance = new ExampleClass('test');
    $expectedArgsList = (new ExtractDependencies())->for($instance);

    foreach ($expectedArgsList as $key => $dependency) {
        $expectedArgsList[$key] = serialize($dependency);
    }

    $result = (new IngredientManager())->generate($instance);
    $generatedIngredient = $result[1];

    expect($generatedIngredient)->dependencies->prop->toEqual($expectedArgsList['prop']);
});

it('serializes class dependency arg with Opis Closure if there is any closure argument for the constructor', function () {
    $instance = new ExampleClass(fn () => 'do something complex', 'override default arg');
    $expectedArgsList = (new ExtractDependencies())->for($instance);

    foreach ($expectedArgsList as $key => $dependency) {
        $expectedArgsList[$key] = $dependency instanceof \Closure ?
                                serialize(new SerializableClosure($dependency)) : serialize($dependency);
    }

    $result = (new IngredientManager())->generate($instance);
    $generatedIngredient = $result[1];

    expect($generatedIngredient['dependencies'])
        ->prop->toEqual($expectedArgsList['prop'])
        ->argOne->toEqual($expectedArgsList['argOne']);
});
