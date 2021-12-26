<?php

namespace Aqua\Aquastrap;

use ReflectionClass;
use ReflectionMethod;
use Illuminate\Support\Str;

class AquaCallableMethods
{
    public static function for(string $className) : array
    {
        if($allowOnlyList = self::allowOnlyMethods($className)) {
            return $allowOnlyList;
        }
        
        $reflection = new ReflectionClass($className);

        return collect($reflection->getMethods(ReflectionMethod::IS_PUBLIC))
            ->reject(fn (ReflectionMethod $method) => self::shouldIgnore($method->getName()))
            ->reject(fn (ReflectionMethod $method) => self::ifParentPublicMethod($className, $method->getName()))
            ->reject(fn (ReflectionMethod $method) => self::ifGuarded($className, $method->getName()))
            ->map(fn (ReflectionMethod $method) => $method->getName())
            ->all();
    }

    protected static function shouldIgnore($name)
    {
        $aquaMethods = [
            '_aquaDrips',
            'success',
            'warning',
            'info',
            'danger',
        ];

        return Str::startsWith($name, '__') ||
               in_array($name, $aquaMethods);
    }

    protected static function ifParentPublicMethod(string $className, string $name) : bool
    {
        $reflection = new ReflectionClass($className);

        $parent_public_methods = collect(
            $reflection->getParentClass()
            ? $reflection->getParentClass()->getMethods(ReflectionMethod::IS_PUBLIC) 
            : []
        )
        ->map(function (ReflectionMethod $method) {
            return $method->getName();
        })
        ->all();

        return in_array($name, $parent_public_methods);
    }

    protected static function ifGuarded(string $className, string $name) : bool
    {
        if (! property_exists($className, 'guarded')) {
            return false;
        }

        $guardedProp = (new ReflectionClass($className))->getProperty('guarded');
        $guardedProp->setAccessible(true);

        return in_array($name, $guardedProp->getValue());
    }

    protected static function allowOnlyMethods(string $className) : bool|array
    {
        if (! property_exists($className, 'aquaCallable')) {
            return false;
        }

        $guardedProp = (new ReflectionClass($className))->getProperty('aquaCallable');
        $guardedProp->setAccessible(true);

        $list = $guardedProp->getValue();

        return empty($list) ? false : $list;
    }
}