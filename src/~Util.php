<?php

namespace Aqua\Aquastrap;

use Aqua\Aquastrap\Traits\AquaSync;
use ReflectionMethod;

class Util
{
    public static function hasStaticMethod(string $className, string $method): bool
    {
        return method_exists($className, $method)
            && (new ReflectionMethod($className, $method))->isStatic();
    }

    public static function isAquaComponent(string $className): bool
    {
        return in_array(AquaSync::class, class_uses_recursive($className));
    }
}
