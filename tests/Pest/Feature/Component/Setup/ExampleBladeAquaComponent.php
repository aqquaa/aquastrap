<?php

namespace Aqua\Aquastrap\Tests\Pest\Feature\Component\Setup;

use Aqua\Aquastrap\AquaComponent;

class ExampleBladeAquaComponent extends AquaComponent
{
    public $loadView;
    public $userID;

    public function __construct($loadView, $userID = 1)
    {
        $this->loadView = $loadView;
        $this->userID = $userID;
    }

    public function render()
    {
        return view("aquatest::$this->loadView");
    }
}
