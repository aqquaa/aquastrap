<?php

use Aqua\Aquastrap\Memo;
use Aqua\Aquastrap\Tests\Pest\ExampleClass;

it('memoizes value for a given class name and key', function () {
    $instance = new ExampleClass('test');

    $execCounter = 0;

    $calculate = function () use (&$execCounter) {
        $execCounter += 1;

        return 10;
    };

    $first = Memo::getMemoized(get_class($instance), 'key1', $calculate);
    $second = Memo::getMemoized(get_class($instance), 'key1', $calculate);
    ;

    expect($first)->toEqual(10)
        ->and($second)->toEqual(10)
        ->and($execCounter)->toEqual(1);

    $third = Memo::getMemoized(get_class($instance), 'key2', $calculate);

    expect($third)->toEqual(10)
        ->and($execCounter)->toEqual(2);

    $anotherCalculator = function () use (&$execCounter) {
        $execCounter += 1;

        return 19;
    };

    $forth = Memo::getMemoized(get_class($instance), 'key2', $anotherCalculator);
    $fifth = Memo::getMemoized(get_class($instance), 'key3', $anotherCalculator);
    $sixth = Memo::getMemoized(get_class($instance), 'key3', $anotherCalculator);

    expect($forth)->toEqual(10)
        ->and($fifth)->toEqual(19)
        ->and($sixth)->toEqual(19)
        ->and($execCounter)->toEqual(3);
});
