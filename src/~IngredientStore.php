<?php

namespace Aqua\Aquastrap;

use Aqua\Aquastrap\Contracts\DependencyLookupStore;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class IngredientStore
{
    public static function set(string $key, array $payload): void
    {
        $store = App::make(DependencyLookupStore::class);

        $prefix = static::prefix();

        $store->set("$prefix:$key", $payload);
    }

    public static function get(string $key): ?array
    {
        $store = App::make(DependencyLookupStore::class);

        $prefix = static::prefix();

        return $store->get("$prefix:$key");
    }

    protected static function prefix(): string
    {
        return '_aqua' . Session::getId();
    }
}
