<?php

use Aqua\Aquastrap\Tests\Pest\Feature\Controller\Setup\BaseController;
use Aqua\Aquastrap\Traits\AquaSync;
use Illuminate\Support\Facades\App;

test('controller using AquaSync can call aquaRecipes method', function () {
    class TestCtrlUsingAquaSync extends BaseController
    {
        use AquaSync;
    }
    class TestCtrlNotUsingAquaSync extends BaseController
    {
    }

    expect(method_exists(TestCtrlUsingAquaSync::class, 'aquaRecipes'))->toBeTrue()
    ->and(method_exists(TestCtrlNotUsingAquaSync::class, 'aquaRecipes'))->toBeFalse();
});

test('the method responsible for returning the view should pass aquaRecipes method data to make _aquaDrips available to the view', function () {
    class TestCtrlUsingAquaSyncAndPassingAquaRecipesUsingViewMethodChain extends BaseController
    {
        use AquaSync;

        public function show()
        {
            return view('has-aqua-drips', ['foo' => 'bar'])->with($this->aquaRecipes());
        }
    }

    class TestCtrlUsingAquaSyncAndPassingAquaRecipesDirectlyViaHelper extends BaseController
    {
        use AquaSync;

        public function show()
        {
            return view('has-aqua-drips', $this->aquaRecipes());
        }
    }

    $content1 = App::make(TestCtrlUsingAquaSyncAndPassingAquaRecipesUsingViewMethodChain::class)->show()->render();
    $content2 = App::make(TestCtrlUsingAquaSyncAndPassingAquaRecipesDirectlyViaHelper::class)->show()->render();

    expect($content1)
    ->toContain('AQUA')
    ->toContain('has $_aquaDrips')
    ->and($content2)
    ->toContain('has $_aquaDrips');
});
