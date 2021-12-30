<?php

namespace Aqua\Aquastrap\Traits;

use Aqua\Aquastrap\Recipe;

trait AquaSync
{
    use Notification;

    /**
     * I need $_aquaDrips to be available in the view
     *
     */
    protected function aquaRecipes(): array
    {
        return [
            '_aquaDrips' => (new Recipe($this))->generate(),
        ];
    }
}
