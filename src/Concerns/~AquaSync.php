<?php

namespace Aqua\Aquastrap\Traits;

use Aqua\Aquastrap\Recipe;
use Illuminate\Auth\Access\Response;

trait AquaSync
{
    use Notification;
    use RateLimit;

    /**
     * Whether the request is allowed,
     * useful in authorization
     */
    public function allowed(): bool|Response
    {
        return true;
    }

    /**
     * The methods to restrict from being called.
     *
     * @var array
     */
    // protected static $aquaGuarded = [];

    /**
     * Only the methods to allow being called.
     *
     * @var array
     */
    // protected static $aquaCallable = [];

    /**
     * I need $_aquaDrips to be available in the view
     *
     */
    protected function aquaRecipes(): array
    {
        return [
            '_aquaDrips' => (new Recipe())($this),
        ];
    }
}
