<?php

namespace Aqua\Aquastrap;

use Exception;
use ReflectionClass;
use ReflectionMethod;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\App as AppContainer;
use Aqua\Aquastrap\Util;
use Aqua\Aquastrap\Crypt\Crypt;
use Aqua\Aquastrap\Exceptions\RequestException;
use Illuminate\Auth\Access\Response;

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

        $this->applyMiddlewares();
    }

    public function Process(Request $request) {
        try {
            $instance = count($this->args) ?
                        AppContainer::makeWith($this->componentClass, $this->args) :
                        AppContainer::make($this->componentClass);

        } catch (\Exception $th) {
            throw RequestException::failedToInstantiate($this->componentClass);
        }
        
        $this->isAuthorized($instance);

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
            abort(403, 'Aquastrap Detected Tampered Data');
        }

        abort_unless(
            is_array($unserialized) && array_key_exists('class', $unserialized) && array_key_exists('dependencies', $unserialized),
            403,
            'Aquastrap Detected Tampered Data'
        );

        $componentClass = str_replace('.', '\\', $unserialized['class']);

        $constructorParams = (array) $unserialized['dependencies'];
        $method = $data->method;

        abort_unless(
            class_exists($componentClass) &&
            Util::isAquaComponent($componentClass) &&
            method_exists($componentClass, $method) &&
            in_array($method, Util::getPublicMethods($componentClass)),
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
                if(isset($constructorParams[$param->name]))
                $args[$param->name] = unserialize($constructorParams[$param->name]);
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

    private function isAuthorized($instance) {
        if(method_exists($instance, 'authorize')) {
            $authorized = $instance->authorize();

            if(is_bool($authorized)) {
                abort_unless($authorized, 403, 'Unauthorized');
                return;
            }

            abort_if(
                $authorized instanceof Response && ! $authorized->allowed(),
                403,
                $authorized->message() ?? 'Unauthorized'
            );
        }
    }
}