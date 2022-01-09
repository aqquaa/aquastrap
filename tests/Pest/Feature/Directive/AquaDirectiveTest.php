<?php

use Illuminate\View\ViewException;

test('the aqua directive works only if the _aquaDrips variable is available to the view', function() {
    expect(fn() => (string) view('aqua-directive')->render())
    ->toThrow(ViewException::class, 'Aquastrap missing drips');
});

test('the aqua directive wants the _aquaDrips be an array with needed keys', function() {
    expect(fn() => (string) view('aqua-directive', ['_aquaDrips' => null])->render())
    ->toThrow(ViewException::class, 'Aquastrap missing drips');

    expect(fn() => (string) view('aqua-directive', ['_aquaDrips' => ['pro', 'gram']])->render())
    ->toThrow(ViewException::class, 'Aquastrap detected malformed drips');

    expect(fn() => (string) view('aqua-directive', ['_aquaDrips' => ['id' => 'shiv', 'key' => 'shambhu', 'ingredient' => 'shankar', 'methods' => ['mahakal', 'nagendra']]])->render())
    ->not->toThrow(ViewException::class);
});

test('the aqua directive prints _aquaGenerate javascript function to the page with proper parameters', function() {
    $content = (string) view('aqua-directive', [
        '_aquaDrips' => [
            'id' => 'shiv', 
            'key' => 'shambhu', 
            'ingredient' => 'shankar', 
            'methods' => ['mahakal', 'nagendra']
        ]
    ])->render();

    expect($content)->toEqual("_aquaGenerate('shiv', 'shambhu', 'shankar', {'0':'mahakal','1':'nagendra'})");
});

test('the aquaConfig directive wants the _aquaDrips be an array having id as key', function() {
    expect(fn() => (string) view('aqua-config-directive', ['_aquaDrips' => null])->render())
    ->toThrow(ViewException::class, 'Aquastrap missing drips');

    expect(fn() => (string) view('aqua-config-directive', ['_aquaDrips' => ['pro']])->render())
    ->toThrow(ViewException::class, 'Aquastrap detected malformed drips');

    expect(fn() => (string) view('aqua-config-directive', ['_aquaDrips' => ['id' => 'shiv']])->render())
    ->not->toThrow(ViewException::class);
});

test('the aquaConfig directive prints _registerAquaConfig javascript function to the page with proper parameters', function() {
    $content = (string) view('aqua-config-directive', [
        '_aquaDrips' => [
            'id' => 'shiv', 
            'key' => 'doesntmatter', 
            'ingredient' => 'doesntmatter', 
            'methods' => ['doesntmatter']
        ]
    ])->render();

    expect($content)->toEqual("_registerAquaConfig('shiv')");
});

test('the aquaScripts directive prints js assets with asset version', function() {
    test()->withPublishedAssets();

    $content = blade('@aquaScripts');

    $manifestPath = __DIR__ .'/../../../../dist/mix-manifest.json';
    expect(file_exists($manifestPath))->toBeTrue();

    $manifest = json_decode(file_get_contents($manifestPath), true);
    foreach ($manifest as $path) {
        expect($content)->toContain(asset('vendor/aquastrap'. $path));
    }

    expect($content)
    ->toContain('<script>window._aquaroute = "'. route('aquastrap.request') .'";</script>');
});