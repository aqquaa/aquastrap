<?php

namespace Devsrv\Aquastrap;

use Exception;
use ReflectionClass;
use ReflectionMethod;
use Devsrv\Aquastrap\Util;
use Illuminate\Http\Request;
use Devsrv\Aquastrap\Crypt\Crypt;
use Illuminate\Routing\Controller;
use Devsrv\Aquastrap\Exceptions\RequestException;

class AquaRoute extends Controller
{
    protected $componentClass;
    protected $args;
    protected $method;

    public function __construct()
    {
        [$componentClass, $args, $method] = $this->Validate(request());

        $this->componentClass   = $componentClass;
        $this->args             = $args;
        $this->method           = $method;

        $this->applyMiddlewares($this->componentClass);
    }

    public function Process(Request $request) {
        try {
            $instance = new ($this->componentClass)(...$this->args);
        } catch (Exception $th) {
            RequestException::failedToInstantiate($this->componentClass);
        }

        return $instance->{$this->method}($request);
    }

    private function Validate(Request $request) : array {
        abort_unless($request->hasHeader('X-Aquastrap'), 422, 'Missing Aquastrap Header');

        $header = $request->header('X-Aquastrap');
        $data = json_decode($header);

        try {
            $decryptedClassIngredient = Crypt::Decrypt($data->ingredient);
            $decoded = base64_decode($decryptedClassIngredient);
            $unserialized = unserialize($decoded);

        } catch (\Exception $e) {
            if(App::environment() === 'production') abort(403, 'Aquastrap Detected Tampered Data');
            else throw $e;
        }

        $componentClass = str_replace('.', '\\', $unserialized['class']);

        $constructorParams = (array) $unserialized['dependencies'];
        $method = $data->method;

        abort_unless(
            class_exists($componentClass) &&
            Util::isAquaComponent($componentClass) &&
            method_exists($componentClass, $method) &&
            (new ReflectionMethod($componentClass, $method))->isPublic(),
            403,
            'Aquastrap Request Restricted'
        );
        
        $reflection = new ReflectionClass($componentClass);

        $constructor = $reflection->getConstructor();

        $args = [];
        if($constructor) {
            $parameters = $constructor->getParameters();

            foreach($parameters as $param)
            {
                throw_if(
                    ! $param->isDefaultValueAvailable() && ! isset($constructorParams[$param->name]), 
                    RequestException::missingArgs($componentClass)
                );

                $args[] = unserialize($constructorParams[$param->name]);
            }
        } 

        return [
            $componentClass, $args, $method
        ];
    }

    private function applyMiddlewares() : void
    {
        if(property_exists($this->componentClass, 'middlewares')) {
            $middlewaresProp = (new ReflectionClass($this->componentClass))->getProperty('middlewares');
            $middlewaresProp->setAccessible(true);

            $this->middleware($middlewaresProp->getValue());
        }
    }
}