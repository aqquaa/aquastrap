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