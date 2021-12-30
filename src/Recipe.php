<?php

namespace Aqua\Aquastrap;

class Recipe
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
     *
     * @return array [
     * 'id' => (string) identifier for the class (component / controller / any target class to be used for handling request),
     * 'key' => (string) identifier for the component instance (useful for blade components where same component can be used multiple times in a page),
     * 'ingredient' => (string) class dependencies stored with the uniqueue key to be used to instantiate the class when ajax rqst received,
     * 'methods' => (array) list of allowed methods of the class to handle request
     * ]
     */
    public function generate(): array
    {
        [$ingredientKey, $ingredient] = (new IngredientManager())->generate($this->classInstance);
        IngredientStore::set($ingredientKey, $ingredient);

        return [
            'id' => Memo::getMemoized(static::$className, 'checksum', fn () => $this->getComponentChecksum()),
            'key' => bin2hex(random_bytes(10)),
            'ingredient' => $ingredientKey,
            'methods' => Memo::getMemoized(static::$className, 'allowed_methods', fn () => $this->getAllowedCallableMethods()),
        ];
    }

    private function getComponentChecksum(): string
    {
        return md5((string) static::$className);
    }

    private function getAllowedCallableMethods(): array
    {
        return AquaCallableMethods::for((string) static::$className);
    }
}
