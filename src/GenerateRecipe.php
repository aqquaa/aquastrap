<?php

namespace Devsrv\Aquastrap;

use Devsrv\Aquastrap\Util;
use Opis\Closure\SerializableClosure;
use Devsrv\Aquastrap\Crypt\Crypt;
use Illuminate\Support\Str;
use InvalidArgumentException;

class GenerateRecipe {
    public string $className;

    public function __construct(string $className) 
    {
        $this->className = Str::of($className)->contains('\\') ? $className : str_replace('.', '\\', $className);

        throw_unless(class_exists($this->className), new InvalidArgumentException('Aquastrap Unable to link given class '. $className));
    }

    public function make($instance = null) : array {
        return [
            'id'          => $this->getComponentChecksum(), 
            'ingredient'  => $this->getComponentIngredient($instance), 
            'methods'     => $this->getAllowedCallableMethods()
        ];
    }

    private function serializeDeps(array $dependencies) : array {
        foreach($dependencies as $key => $dependency) {
            $dependencies[$key] = $dependency instanceof \Closure ?
                                serialize(new SerializableClosure($dependency)) : serialize($dependency);
        }

        return $dependencies;
    }

    private function getComponentDependencies($instance) : array {
        $constructorArgs = [];

        if(! $instance) return $this->serializeDeps($constructorArgs);

        $reflectionRef = new \ReflectionClass($instance);
        $classConstructor = $reflectionRef->getConstructor();

        if($classConstructor) {
            $parameters = $classConstructor->getParameters();

            foreach($parameters as $param)
            {
                $paramName = $param->getName();

                if(property_exists($instance, $paramName)) {
                    $reflectionProperty = $reflectionRef->getProperty($paramName);
                    
                    $constructorArgs[$paramName] = $reflectionProperty->isStatic() ? $reflectionRef->getStaticPropertyValue($paramName) : $instance->{$paramName};
                    continue;
                }

                if($param->isDefaultValueAvailable()) {
                    $constructorArgs[$paramName] = $param->getDefaultValue();
                    continue;
                }

                throw new \RuntimeException('Aquastrap component constructor argument missing '. (string) $this->className);
            }
        }

        return $this->serializeDeps($constructorArgs);
    }

    private function getComponentChecksum() : string {
        $classWithNamespace = (string) $this->className;
        return md5($classWithNamespace);
    }

    private function getComponentClassName() : string
    {
        return (string) str_replace('\\', '.', $this->className);
    }

    private function getComponentIngredient($instance) : string
    {
        $payload = base64_encode(serialize([
                'class' => $this->getComponentClassName(),
                'dependencies' => $this->getComponentDependencies($instance)
            ]
        ));

        return Crypt::Encrypt($payload);
    }

    private function getAllowedCallableMethods() : array
    {
        return Util::getPublicMethods((string) $this->className);
    }
}