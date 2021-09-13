<?php

namespace Aqua\Aquastrap;

use Aqua\Aquastrap\Util;
use Opis\Closure\SerializableClosure;
use Aqua\Aquastrap\Crypt\Crypt;
use Illuminate\Support\Str;
use InvalidArgumentException;

class GenerateRecipe {
    protected static string $className;
    protected $classInstance;
    protected array $suppliedDependencies = [];

    protected static array $store = [];

    public function __construct(string $className) 
    {
        static::$className = Str::of($className)->contains('\\') ? $className : str_replace('.', '\\', $className);

        throw_unless(class_exists(static::$className), new InvalidArgumentException('Aquastrap Unable to link given class '. $className));
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

    /**
     * id -> identifier for the class (component / controller / any target class to be used for handling request)
     * key -> identifier for the component instance (useful for blade components where same component can be used multiple times in a page)
     * ingredient -> class dependencies required to instantiate
     * methods -> list of allowed methods of the class to handle request
     */
    private function recipe() : array {
        $ingredient = (string) $this->getComponentIngredient();

        return [
            'id'          => static::getMemoized('checksum', function() { return $this->getComponentChecksum(); }),
            'key'         => bin2hex(random_bytes(10)),
            'ingredient'  => static::getMemoized('ingredient.'. $ingredient, function() use ($ingredient) { return  Crypt::Encrypt($ingredient); }),
            'methods'     => static::getMemoized('allowed_methods', function() { return $this->getAllowedCallableMethods(); })
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
        return md5((string) static::$className);
    }

    private function getComponentClassName() : string
    {
        return (string) str_replace('\\', '.', static::$className);
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

        return $payload;
    }

    private function getAllowedCallableMethods() : array
    {
        return Util::getPublicMethods((string) static::$className);
    }

    protected static function getMemoized($key, $setter = null) {
        if(! isset(static::$store[static::$className][$key]) && $setter instanceof \Closure) {
            static::$store[static::$className][$key] = $setter();
        }

        return static::$store[static::$className][$key] ?: null;
    }
}