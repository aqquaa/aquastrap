<?php

namespace Aqua\Aquastrap;

use Aqua\Aquastrap\Util;
use Illuminate\Support\Str;
use InvalidArgumentException;
use Aqua\Aquastrap\Crypt\Crypt;
use Opis\Closure\SerializableClosure;
use Aqua\Aquastrap\ExtractDependencies;
use Illuminate\Support\Facades\Session;
use Aqua\Aquastrap\Contracts\DependencyLookupStore;
use Illuminate\Support\Facades\App;

class GenerateRecipe {
    protected static string $className;
    protected $classInstance;

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
     * id -> identifier for the class (component / controller / any target class to be used for handling request)
     * key -> identifier for the component instance (useful for blade components where same component can be used multiple times in a page)
     * ingredient -> class dependencies required to instantiate
     * methods -> list of allowed methods of the class to handle request
     */
    private function recipe() : array {
        $key            = bin2hex(random_bytes(10));
        $ingredientTag  = $this->getComponentIngredientTag($key);
        $this->storeComponentIngredient($key, $this->getComponentDependencies());

        return [
            'id'          => static::getMemoized('checksum', function() { return $this->getComponentChecksum(); }),
            'key'         => $key,
            'ingredient'  => static::getMemoized('ingredient.'. $key, function() use ($ingredientTag) { return Crypt::Encrypt($ingredientTag); }),
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

        $constructorArgs = (new ExtractDependencies)->for($this->classInstance);

        return $this->serializeDeps($constructorArgs);
    }

    private function getComponentChecksum() : string {
        return md5((string) static::$className);
    }

    private function getComponentClassName() : string
    {
        return (string) str_replace('\\', '.', static::$className);
    }

    private function getComponentIngredientTag(string $key) : string
    {
        $payload = base64_encode(serialize(
            [
                'class' => $this->getComponentClassName(),
                'key' => $key
            ]
        ));

        return $payload;
    }

    private function storeComponentIngredient(string $key, array $payload) : void
    {
        if(empty($payload)) return;

        $uniqueId = Session::getId();

        $store = App::make(DependencyLookupStore::class);

        $store->set("$uniqueId:$key", $payload);
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