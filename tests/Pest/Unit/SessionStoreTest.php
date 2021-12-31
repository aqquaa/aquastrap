<?php

use Aqua\Aquastrap\DepsLookup\SessionStore;

it('can store data to session store when nothing existing present', function () {
    $sessionId = 'abcdefunique';
    $key = md5('random');

    $value = ['green', 'blue'];

    (new SessionStore())->set("$sessionId:$key", $value);

    $stored = session("$sessionId.$key", []);

    expect($stored)->toMatchArray($value);
});

it('can store data to session store when some previous data present', function () {
    $sessionId = 'abcdefunique';

    $key1 = md5('random1');
    $value1 = ['green', 'blue'];
    (new SessionStore())->set("$sessionId:$key1", $value1);

    $key2 = md5('random2');
    $value2 = ['teal', 'cyan'];
    (new SessionStore())->set("$sessionId:$key2", $value2);


    $stored1 = session("$sessionId.$key1", []);
    $stored2 = session("$sessionId.$key2", []);

    expect($stored1)
        ->toMatchArray($value1)
        ->and($stored2)
        ->toMatchArray($value2);
});

it('replace previous data with same key', function () {
    $sessionId = 'abcdefunique';

    $key1 = md5('random1');
    $value1 = ['green', 'blue'];
    (new SessionStore())->set("$sessionId:$key1", $value1);

    $value2 = ['teal', 'cyan'];
    (new SessionStore())->set("$sessionId:$key1", $value2);


    $stored = session("$sessionId.$key1", []);

    expect($stored)
        ->toMatchArray($value2);
});

it('can get data from session store when nothing present', function () {
    $sessionId = 'abcdefunique';

    $key = md5('random');

    $result = (new SessionStore())->get("$sessionId:$key");

    expect($result)->toHaveCount(0);
});

it('can get data from session store when only one record present', function () {
    $sessionId = 'abcdefunique';

    $key = md5('random');
    $value = ['green', 'blue'];
    (new SessionStore())->set("$sessionId:$key", $value);

    $result = (new SessionStore())->get("$sessionId:$key");

    expect(session($sessionId))->toHaveCount(1)
    ->and($result)->toMatchArray($value);
});

it('can get data from session store when more than one records present', function () {
    $sessionId = 'abcdefunique';

    $key1 = md5('random1');
    $value1 = ['green', 'blue'];
    (new SessionStore())->set("$sessionId:$key1", $value1);

    $key2 = md5('random2');
    $value2 = ['teal', 'cyan'];
    (new SessionStore())->set("$sessionId:$key2", $value2);

    $result1 = (new SessionStore())->get("$sessionId:$key1");
    $result2 = (new SessionStore())->get("$sessionId:$key2");

    expect(session($sessionId))->toHaveCount(2)
    ->and($result1)->toMatchArray($value1)
    ->and($result2)->toMatchArray($value2);
});
