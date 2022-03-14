<?php

namespace Aqua\Aquastrap;

use Aqua\Aquastrap\Traits\AquaSync;
use Illuminate\View\Component as NativeViewComponent;

class AquaComponent extends NativeViewComponent
{
    use AquaSync;

    public $_aquaDrips;

    public function resolveView()
    {
        $this->_aquaDrips = $this->aquaRecipes()['_aquaDrips'];

        return parent::resolveView();
    }

    public function render()
    {
    }
}
