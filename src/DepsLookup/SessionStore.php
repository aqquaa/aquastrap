<?php

namespace Aqua\Aquastrap\DepsLookup;

use Aqua\Aquastrap\Contracts\DependencyLookupStore;

class SessionStore implements DependencyLookupStore {
    public function get(string $id) : array {
        [$prefix, $key] = explode(':', $id);

        return session("$prefix.$key", []);
    }

    public function set(string $id, array $deps) : void {
        [$prefix, $key] = explode(':', $id);

        session()->put("$prefix.$key", $deps);
    }
}