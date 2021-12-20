<?php

namespace Aqua\Aquastrap\Contracts;

interface DependencyLookupStore {
    public function get(string $id) : array;

    public function set(string $id, array $deps) : void;
}