<?php

namespace Devsrv\Aquastrap;

use Closure;
use Illuminate\Container\Container;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;
use SplFileInfo;
use Symfony\Component\Finder\Finder;

class Util
{
    /**
     * @param string|array $paths
     */
    public static function loadClasses($paths, Closure $callback): void
    {
        if (empty($paths = static::getAbsoluteDirectories($paths))) {
            return;
        }

        foreach ((new Finder)->in($paths)->files() as $file) {
            if (class_exists($className = static::getClassnameFromFile($file))) {
                $callback($className);
            }
        }
    }

    /**
     * @param string|array $paths
     * @return array
     */
    public static function getAbsoluteDirectories($paths): array
    {
        return Collection::wrap($paths)
            ->map(function (string $path) {
                return Str::startsWith($path, DIRECTORY_SEPARATOR) ? $path : base_path($path);
            })
            ->unique()
            ->filter(function (string $path) {
                return is_dir($path);
            })
            ->values()
            ->toArray();
    }

    public static function getClassnameFromFile(SplFileInfo $file): string
    {
        return static::getClassnameFromRealpath($file->getRealPath());
    }

    public static function getClassnameFromRealpath(string $realpath): string
    {
        return Container::getInstance()->getNamespace() . str_replace(
            ['/', '.php'],
            ['\\', ''],
            Str::after($realpath, realpath(app_path()).DIRECTORY_SEPARATOR)
        );
    }

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
        return array_merge([
            'getComponentPublicMethods',
            'getMiddleware',
            'routes'
        ], get_class_methods(\Illuminate\View\Component::class));
    }
}
