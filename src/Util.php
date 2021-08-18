<?php

namespace Aqua\Aquastrap;

use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;
use Aqua\Aquastrap\Traits\AquaSync;

class Util
{
    public static function hasStaticMethod(string $className, string $method): bool
    {
        return method_exists($className, $method)
            && (new ReflectionMethod($className, $method))->isStatic();
    }

    public static function getPublicMethods(string $className) : array {
        $reflection = new ReflectionClass($className);

        return collect($reflection->getMethods(ReflectionMethod::IS_PUBLIC))
            ->reject(function (ReflectionMethod $method) {
                return self::shouldIgnore($method->getName());
            })
            ->reject(function (ReflectionMethod $method) use ($className) {
                return self::ignoreParentPublicMethods($className, $method->getName());
            })
            ->reject(function (ReflectionMethod $method) use ($className) {
                return self::ignoreGuardedMethods($className, $method->getName());
            })
            ->map(function (ReflectionMethod $method) {
                return $method->getName();
            })
            ->all();
    }

    protected static function shouldIgnore($name)
    {
        return Str::startsWith($name, '__') ||
               in_array($name, self::ignorePublicMethods());
    }

    protected static function ignorePublicMethods()
    {
        return [
            '_aquaDrips',
            'success',
            'warning',
            'info',
            'danger'
        ];
    }

    protected static function ignoreParentPublicMethods(string $className, string $name)
    {
        $reflection = new ReflectionClass($className);

        $parent_public_methods = collect(
            $reflection->getParentClass() ? 
            $reflection->getParentClass()->getMethods(ReflectionMethod::IS_PUBLIC) : 
            []
        )
        ->map(function(ReflectionMethod $method) { return $method->getName(); })
        ->all();

        return in_array($name, $parent_public_methods);
    }

    protected static function ignoreGuardedMethods(string $className, string $name)
    {
        if(! property_exists($className, 'guarded')) return false;

        $guardedProp = (new ReflectionClass($className))->getProperty('guarded');
        $guardedProp->setAccessible(true);

        return in_array($name, $guardedProp->getValue());
    }

    public static function isAquaComponent(string $className) : bool {
        return in_array(AquaSync::class, class_uses_recursive($className));
    }
}
