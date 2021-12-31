<?php

namespace Aqua\Aquastrap;

class Memo
{
    protected static array $store = [];

    public static function getMemoized($className, $key, $setter = null)
    {
        if (! isset(static::$store[$className][$key]) && $setter instanceof \Closure) {
            static::$store[$className][$key] = $setter();
        }

        return static::$store[$className][$key] ?: null;
    }
}
