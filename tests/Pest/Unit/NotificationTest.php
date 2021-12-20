<?php

use Illuminate\Testing\TestResponse;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class TestClassUsingAquaNotificationTrait {
    use Aqua\Aquastrap\Traits\Notification;
}

test('when using Notification trait the response contain proper header', function() {
    $notification = (new TestClassUsingAquaNotificationTrait)
    ->success('success message');

    $response = TestResponse::fromBaseResponse($notification);

    $response
    ->assertStatus(SymfonyResponse::HTTP_OK)
    ->assertHeader('X-Aqua-Notification', json_encode(['type' => 'success', 'message' => 'success message']));

    expect($notification)->toBeInstanceOf(Response::class);
});

test('when using Notification trait the response contain proper status code & content', function() {
    $notification = (new TestClassUsingAquaNotificationTrait)
    ->warning('warning message')
    ->setStatusCode(SymfonyResponse::HTTP_CREATED)
    ->setContent([
        'foo' => 'bar'
    ]);

    $response = TestResponse::fromBaseResponse($notification);

    $response
    ->assertStatus(SymfonyResponse::HTTP_CREATED)
    ->assertHeader('X-Aqua-Notification', json_encode(['type' => 'warning', 'message' => 'warning message']))
    ->assertExactJson([
        'foo' => 'bar',
    ]);

    expect($notification)->toBeInstanceOf(Response::class);
});

it('support success warning info and danger methods', function() {
    foreach (['success', 'warning', 'info', 'danger'] as $type) {
        $notification = (new TestClassUsingAquaNotificationTrait)
                        ->{$type}($type. ' message');

        $response = TestResponse::fromBaseResponse($notification);

        $response->assertHeader('X-Aqua-Notification', json_encode(['type' => $type, 'message' => $type. ' message']));
    }
});

it('doesnt support anything other than success warning info and danger', function() {
    (new TestClassUsingAquaNotificationTrait)->bar('foo message');
})->throws(BadMethodCallException::class, 'method not supported');
