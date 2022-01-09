<?php

namespace Aqua\Aquastrap\Traits;

use Aqua\Aquastrap\Recipe;

trait AquaSync
{
    use Notification;

    /**
     * The middlewares to apply when any of the allowed method of this class gets called.
     *
     * @var array
     */
    protected static $middlewares = [];

    /**
     * Whether the request is allowed,
     * useful in authorization
     *
     * @var bool
     */
    public function allowed(): bool
    {
        return true;
    }

    /**
     * The methods to restrict from being called.
     *
     * @var array
     */
    protected static $aquaGuarded = [];

    /**
     * Only the methods to allow being called.
     *
     * @var array
     */
    protected static $aquaCallable = [];

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
