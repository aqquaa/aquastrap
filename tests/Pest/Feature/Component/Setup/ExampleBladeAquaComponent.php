<?php

namespace Aqua\Aquastrap\Tests\Pest\Feature\Component\Setup;

use Illuminate\View\Component;
use Aqua\Aquastrap\AquaComponent;
use Aqua\Aquastrap\Traits\AquaSync;

class ExampleBladeAquaComponent extends AquaComponent
{
    use AquaSync;

    public $loadView = '';

    public function __construct($loadView) 
    {
        $this->loadView = $loadView;
    }

    public function render()
    {
        return view("aquatest::$this->loadView");
    }
}