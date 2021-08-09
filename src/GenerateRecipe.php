<?php

namespace Devsrv\Aquastrap;

use Devsrv\Aquastrap\Util;
use Opis\Closure\SerializableClosure;
use Devsrv\Aquastrap\Crypt\Crypt;
use Illuminate\Support\Str;
use InvalidArgumentException;

class GenerateRecipe {
    protected string $className;
    protected $classInstance;
    protected array $suppliedDependencies = [];

    public function __construct(string $className) 
    {
        $this->className = Str::of($className)->contains('\\') ? $className : str_replace('.', '\\', $className);

        throw_unless(class_exists($this->className), new InvalidArgumentException('Aquastrap Unable to link given class '. $className));
    }

    /**
     * generate by providing an intance of the class
     */
    public function make(object $instance) : array {
        $this->classInstance = $instance;

        return $this->recipe();
    }

    /**
     * generate by providing the dependencies of the class
     */
    public function makeWithSuppliedDependencies(array $suppliedDependencies = []) : array {
        $this->suppliedDependencies = $suppliedDependencies;

        return $this->recipe();
    }

    private function recipe() : array {
        return [
            'id'          => $this->getComponentChecksum(), 
            'ingredient'  => $this->getComponentIngredient(), 
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

    /**
     * if instance passed then figure out class dependencies based on it
     * if passed the dependencies no need to resolve
     * 
     * @return array serialized
     */
    private function getComponentDependencies() : array {
        $constructorArgs = [];

        if($this->suppliedDependencies) {
            $constructorArgs = $this->suppliedDependencies;
        };

        if($this->classInstance) {
            $constructorArgs = $this->resolveDependencies($this->classInstance);
        }

        return $this->serializeDeps($constructorArgs);
    }

    /**
     * from class instance to constructor dependencies
     * 
     * @param object $instance
     * @return array dependencies as assoiative array
     */
    private function resolveDependencies(object $instance) : array {
        $constructorArgs = [];

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
                }
            }
        }

        return $constructorArgs;
    }

    private function getComponentChecksum() : string {
        $classWithNamespace = (string) $this->className;
        return md5($classWithNamespace);
    }

    private function getComponentClassName() : string
    {
        return (string) str_replace('\\', '.', $this->className);
    }

    /**
     * the data to be passed with aqua xhr request header
     */
    private function getComponentIngredient() : string
    {
        $payload = base64_encode(serialize([
                'class' => $this->getComponentClassName(),
                'dependencies' => $this->getComponentDependencies()
            ]
        ));

        return Crypt::Encrypt($payload);
    }

    private function getAllowedCallableMethods() : array
    {
        return Util::getPublicMethods((string) $this->className);
    }
}