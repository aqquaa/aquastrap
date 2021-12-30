<?php

use Aqua\Aquastrap\Tests\Pest\Feature\Component\Setup\ExampleBladeAquaComponent;
use Illuminate\View\Component;
use Aqua\Aquastrap\Traits\AquaSync;

test('blade component extending AquaComponent will have _aquaDrips property which will be automatically passed into view', function () {
    $view = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-aqua-drips']);
    
    expect($view)
    ->toContain('AQUA')
    ->toContain('has $_aquaDrips');
});

test('blade component extending Native IlluminateViewComponent using AquaSync will not have _aquaDrips property auto passed into view', function () {
    class ExampleNativeBladeComponent extends Component
    {
        use AquaSync;

        public function render()
        {
            return view("aquatest::has-aqua-drips");
        }
    }
    
    $view = (string) $this->component(ExampleNativeBladeComponent::class);
    
    expect($view)
    ->toContain('AQUA')
    ->toContain('no $_aquaDrips');
});

test('blade component extending Native ViewComponent using AquaSync will have _aquaDrips property passed into view when aquaRecipes method data manually passed from the render method of component class', function () {
    class BladeComponentPassingAquaRecipesCallingWith extends Component
    {
        use AquaSync;

        public function render()
        {
            return view("aquatest::has-aqua-drips")->with($this->aquaRecipes());
        }
    }
    
    $view = (string) $this->component(BladeComponentPassingAquaRecipesCallingWith::class);
    
    expect($view)
    ->toContain('AQUA')
    ->toContain('has $_aquaDrips');
});

test('blade component using AquaSync will have _aquaDrips property passed into view when aquaRecipes method data passed from the render method of component class by directly passing to the view helper', function () {
    class BladeComponentPassingAquaRecipesWithViewHelper extends Component
    {
        use AquaSync;

        public function render()
        {
            return view("aquatest::has-aqua-drips", $this->aquaRecipes());
        }
    }
    
    $view = (string) $this->component(BladeComponentPassingAquaRecipesWithViewHelper::class);
    
    expect($view)
    ->toContain('AQUA')
    ->toContain('has $_aquaDrips');
});

test('_aquaDrips contains all recipe keys', function () {
    class CompPassingAquaRecipes extends Component
    {
        use AquaSync;

        public function render()
        {
            return view("aquatest::has-drips-keys", $this->aquaRecipes());
        }
    }

    $aquaComponentContent = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-drips-keys']);
    $bladeComponentContent = (string) $this->component(CompPassingAquaRecipes::class);
    
    expect($aquaComponentContent)
        ->toContain('has recipe id')
        ->toContain('has recipe key')
        ->toContain('has recipe ingredient')
        ->toContain('has recipe methods')
    ->and($bladeComponentContent)
        ->toContain('has recipe id')
        ->toContain('has recipe key')
        ->toContain('has recipe ingredient')
        ->toContain('has recipe methods');
});

test('one component rendered multiple times with same prop will have one ingredient store', function() {
    $storeKey1 = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-aqua-ingredient-store-key', 'userID' => 2]);
    $storeKey2 = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-aqua-ingredient-store-key', 'userID' => 2]);

    expect($storeKey1)->toEqual($storeKey2);
});

test('one component rendered twice with different prop will have different ingredient stores', function() {
    $storeKey1 = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-aqua-ingredient-store-key', 'userID' => 1]);
    $storeKey2 = (string) $this->component(ExampleBladeAquaComponent::class, ['loadView' => 'has-aqua-ingredient-store-key', 'userID' => 2]);

    expect($storeKey1)->not->toEqual($storeKey2);
});