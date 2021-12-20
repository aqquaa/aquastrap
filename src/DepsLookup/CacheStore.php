<?php

namespace Aqua\Aquastrap\DepsLookup;

use Aqua\Aquastrap\Contracts\DependencyLookupStore;
use Illuminate\Support\Facades\Cache;

class CacheStore implements DependencyLookupStore {
    public function get(string $id) : array {
        return Cache::get($id, []);
    }

    public function set(string $id, array $deps) : void {
        Cache::put($id, $deps, now()->addHours(10));
    }
}