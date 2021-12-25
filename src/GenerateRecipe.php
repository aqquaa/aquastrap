<?php

namespace Aqua\Aquastrap;

class GenerateRecipe
{
    protected static string $className;
    protected object $classInstance;

    protected static array $store = [];

    public function __construct(object $classInstance)
    {
        $this->classInstance = $classInstance;
        self::$className = get_class($classInstance);
    }

    /**
     * generate by providing an intance of the class
     */
    public function make(): array
    {
        return $this->recipe();
    }

    /**
     * id -> identifier for the class (component / controller / any target class to be used for handling request)
     * key -> identifier for the component instance (useful for blade components where same component can be used multiple times in a page)
     * ingredient -> class dependencies required to instantiate
     * methods -> list of allowed methods of the class to handle request
     */
    private function recipe(): array
    {
        [$key, $ingredient] = (new IngredientManager())->generate($this->classInstance);
        IngredientStore::set($key, $ingredient);

        return [
            'id' => static::getMemoized('checksum', function () {
                return $this->getComponentChecksum();
            }),
            'key' => bin2hex(random_bytes(10)),
            'ingredient' => static::getMemoized('ingredient.'. $key, function () use ($key) {
                return $key;
            }),
            'methods' => static::getMemoized('allowed_methods', function () {
                return $this->getAllowedCallableMethods();
            }),
        ];
    }

    private function getComponentChecksum(): string
    {
        return md5((string) static::$className);
    }

    private function getAllowedCallableMethods(): array
    {
        return Util::getPublicMethods((string) static::$className);
    }

    protected static function getMemoized($key, $setter = null)
    {
        if (! isset(static::$store[static::$className][$key]) && $setter instanceof \Closure) {
            static::$store[static::$className][$key] = $setter();
        }

        return static::$store[static::$className][$key] ?: null;
    }
}
