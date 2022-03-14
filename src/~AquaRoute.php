<?php

namespace Aqua\Aquastrap;

use Aqua\Aquastrap\Exceptions\RequestException;
use Aqua\Aquastrap\Exceptions\TooManyRequestsException;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\App as AppContainer;
use ReflectionClass;

class AquaRoute extends Controller
{
    protected $componentClass;
    protected $args;
    protected $method;

    protected function boot()
    {
        [$componentClass, $args, $method] = $this->Validate(request());

        $this->componentClass = $componentClass;
        $this->args = $args;
        $this->method = $method;
    }

    public function Process(Request $request)
    {
        $this->boot();

        try {
            $instance = count($this->args) ?
                        AppContainer::makeWith($this->componentClass, $this->args) :
                        AppContainer::make($this->componentClass);
        } catch (\Exception $th) {
            throw RequestException::failedToInstantiate($this->componentClass);
        }

        $this->isAuthorized($instance);

        try {
            $response = $instance->{$this->method}($request);
        } catch (TooManyRequestsException $e) {
            return $this->rateLimitedNotification($e->secondsUntilAvailable);
        }

        return $response;
    }

    private function Validate(Request $request): array
    {
        abort_unless($request->hasHeader('X-Aquastrap'), 422, 'Missing Aquastrap Header');

        $header = $request->header('X-Aquastrap');
        $data = json_decode($header);
        $storeKey = $data->ingredient;
        $method = $data->method;

        $ingredient = $this->findIngredient($storeKey);

        abort_unless($ingredient, 403, 'Aquastrap Detected Tampered Data');

        $componentClass = $ingredient['class'];
        $constructorParams = (array) $ingredient['dependencies'];

        abort_unless(
            class_exists($componentClass) &&
            Util::isAquaComponent($componentClass) &&
            method_exists($componentClass, $method) &&
            in_array($method, AquaCallableMethods::for($componentClass)),
            403,
            'Aquastrap Request Restricted'
        );

        $reflection = new ReflectionClass($componentClass);

        $constructor = $reflection->getConstructor();

        $args = [];
        if ($constructor) {
            $parameters = $constructor->getParameters();

            foreach ($parameters as $param) {
                if (isset($constructorParams[$param->name])) {
                    $args[$param->name] = unserialize($constructorParams[$param->name]);
                }
            }
        }

        return [
            $componentClass, $args, $method,
        ];
    }

    protected function findIngredient(string $key): ?array
    {
        if (! $ingredient = IngredientStore::get($key)) {
            return null;
        }

        if (! isset($ingredient['class']) || ! array_key_exists('dependencies', $ingredient)) {
            return null;
        }

        return $ingredient;
    }

    private function isAuthorized($instance)
    {
        if (method_exists($instance, 'allowed')) {
            $authorized = $instance->allowed();

            if (is_bool($authorized)) {
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

    protected function rateLimitedNotification($seconds)
    {
        return (new Notify())(
            '<strong class="font-weight-bold">Too many requests!</strong>  You may try again in '.$seconds.' seconds',
            'warning'
        )->setStatusCode(429)
        ->setContent([
            'message' => 'Too many requests !',
        ]);
    }
}
