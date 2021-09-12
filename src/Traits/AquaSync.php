<?php

namespace Aqua\Aquastrap\Traits;

use Aqua\Aquastrap\GenerateRecipe;
use Aqua\Aquastrap\Traits\Notification;

trait AquaSync
{
    use Notification;

    /**
     * I need $_aquaDrips to be available in the view
     * 
     */
    protected function aquaRecipes() : array {
        return [
            '_aquaDrips' => (new GenerateRecipe((string) self::class))->make($this)
        ];
    }
}
