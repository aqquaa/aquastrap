<?php

namespace Aqua\Aquastrap;

class Recipe
{
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
    public function __invoke(object $classInstance): array
    {
        $className = get_class($classInstance);

        [$ingredientKey, $ingredient] = (new IngredientManager())->generate($classInstance);
        IngredientStore::set($ingredientKey, $ingredient);

        return [
            'id' => Memo::getMemoized($className, 'checksum', fn () => $this->getComponentChecksum($className)),
            'key' => bin2hex(random_bytes(10)),
            'ingredient' => $ingredientKey,
            'methods' => Memo::getMemoized($className, 'allowed_methods', fn () => $this->getAllowedCallableMethods($className)),
        ];
    }

    private function getComponentChecksum(string $className): string
    {
        return md5($className);
    }

    private function getAllowedCallableMethods(string $className): array
    {
        return AquaCallableMethods::for($className);
    }
}
