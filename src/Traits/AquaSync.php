<?php

namespace Aqua\Aquastrap\Traits;

use Aqua\Aquastrap\GenerateRecipe;

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
            '_aquaDrips' => (new GenerateRecipe($this))->make(),
        ];
    }
}
