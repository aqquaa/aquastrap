<?php

namespace Devsrv\Aquastrap;

use Illuminate\View\Component as NativeViewComponent;

class AquaComponent extends NativeViewComponent
{
    public $_aquaDrips;

    public function resolveView() {
        $this->_aquaDrips = $this->aquaRecipes()['_aquaDrips'];

        return parent::resolveView();
    }

    public function render() { }
}
