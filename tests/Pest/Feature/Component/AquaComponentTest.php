<?php

use Aqua\Aquastrap\Tests\Pest\Feature\Component\Setup\ExampleBladeAquaComponent;

test('blade component extending AquaComponent and using AquaSync trait will get _aquaDrips property', function () {
    $view = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-aqua-drips']);
    
    expect($view)
        ->toContain('AQUA')
        ->toContain('has $_aquaDrips');
});

test('blade component extending AquaComponent and using AquaSync will have _aquaDrips with all recipe keys', function () {
    $view = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-drips-keys']);
    
    expect($view)
        ->toContain('has recipe id')
        ->toContain('has recipe ingredient')
        ->toContain('has recipe methods');
});