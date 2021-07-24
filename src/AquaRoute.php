<?php

namespace Devsrv\Aquastrap;

use Exception;
use ReflectionClass;
use ReflectionMethod;
use Devsrv\Aquastrap\Util;
use Illuminate\Http\Request;
use Devsrv\Aquastrap\Exceptions\RequestException;

class AquaRoute
{
    public function Process(Request $request) {
        [$componentClass, $args, $method] = $this->Validate($request);

        try {
            $instance = new $componentClass(...$args);
        } catch (Exception $th) {
            RequestException::failedToInstantiate($componentClass);
        }

        return $instance->{$method}($request);
    }

    private function Validate(Request $request) {
        abort_unless($request->hasHeader('X-Aquastrap'), 422, 'Missing Aquastrap Header');

        $header = $request->header('X-Aquastrap');
        $data = json_decode($header);

        $componentClass = str_replace('.', '\\', $data->component->class);

        $constructorParams = (array) $data->component->params;
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
                throw_unless(isset($constructorParams[$param->name]), RequestException::missingArgs($componentClass));

                $args[] = $constructorParams[$param->name];
            }
        } 

        return [
            $componentClass, $args, $method
        ];
    }
}