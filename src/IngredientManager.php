<?php

namespace Aqua\Aquastrap;

use Opis\Closure\SerializableClosure;
use Aqua\Aquastrap\ExtractDependencies;

class IngredientManager {
    /**
     * generate by providing an intance of the class
     */
    public function generate(object $instance) : array {
        $ingredient = [
            'class' => get_class($instance),
            'dependencies' => $this->prepareDependencies($instance)
        ];

        $key = md5(base64_encode(serialize($ingredient)));

        return [$key, $ingredient];
    }

    /**
     * find ingredients by store key
     */
    public static function find(string $key) : ?array {
        if(! $ingredient = IngredientStore::get($key)) { return null; }

        if(! isset($ingredient['class']) || ! array_key_exists('dependencies', $ingredient)) { return null; }

        return $ingredient;
    }

    /**
     * if instance passed then figure out class dependencies based on it
     * if passed the dependencies no need to resolve
     * 
     * @return array serialized
     */
    private function prepareDependencies(object $instance) : array {
        $constructorArgs = [];

        $constructorArgs = (new ExtractDependencies)->for($instance);

        return $this->serializeDeps($constructorArgs);
    }

    private function serializeDeps(array $dependencies) : array {
        foreach($dependencies as $key => $dependency) {
            $dependencies[$key] = $dependency instanceof \Closure ?
                                serialize(new SerializableClosure($dependency)) : serialize($dependency);
        }

        return $dependencies;
    }
}