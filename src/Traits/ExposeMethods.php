<?php

namespace Devsrv\Aquastrap\Traits;

use InvalidArgumentException;
use Illuminate\Routing\ControllerMiddlewareOptions;
use Illuminate\Routing\Exceptions\UrlGenerationException;
use \Facades\Devsrv\Aquastrap\RouteLoader;
use Illuminate\Support\Str;

trait ExposeMethods
{
    protected array $middleware = [];

    /**
     * Register middleware on the component class.
     *
     * @param  \Closure|array|string  $middleware
     * @param  array  $options
     * @return \Illuminate\Routing\ControllerMiddlewareOptions
     */
    protected function middleware($middleware, array $options = [])
    {
        foreach ((array) $middleware as $m) {
            $this->middleware[] = [
                'middleware' => $m,
                'options' => &$options,
            ];
        }

        return new ControllerMiddlewareOptions($options);
    }

    /**
     * Get the middleware assigned to the component.
     *
     * @return array
     */
    public function getMiddleware() : array
    {
        return $this->middleware;
    }

    public function aquaroute($method) {
        return action([static::class, $method]);
    }

    public function _drips() {
        $classWithNamespace = (string) static::class;
        $classWithNamespace = str_replace('App\\View\\Components\\', '', $classWithNamespace);

        $id = collect(explode('\\', $classWithNamespace))->map(fn($p) => Str::kebab($p))->implode('.');

        return ['component' => $id ];
    }
}
