<?php

namespace Devsrv\Aquastrap;

use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;
use Devsrv\Aquastrap\Traits\AquaSync;

class Util
{
    public static function hasStaticMethod(string $className, string $method): bool
    {
        return method_exists($className, $method)
            && (new ReflectionMethod($className, $method))->isStatic();
    }

    public static function getPublicMethods(string $className) : array {
        $reflection = new ReflectionClass($className);

        $parent_public_methods = collect(
            $reflection->getParentClass() ? 
                $reflection->getParentClass()->getMethods(ReflectionMethod::IS_PUBLIC) : 
                []
            )
            ->map(function(ReflectionMethod $method) { return $method->getName(); })
            ->all();

        return collect($reflection->getMethods(ReflectionMethod::IS_PUBLIC))
            ->reject(function (ReflectionMethod $method) {
                return self::shouldIgnore($method->getName());
            })
            ->reject(function (ReflectionMethod $method) use ($parent_public_methods) {
                return in_array($method->getName(), $parent_public_methods);
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

    public static function isAquaComponent(string $className) : bool {
        return in_array(AquaSync::class, class_uses_recursive($className));
    }
}
