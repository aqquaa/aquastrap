<?php

namespace Devsrv\Aquastrap\Traits;

use InvalidArgumentException;
use Illuminate\Routing\ControllerMiddlewareOptions;
use Illuminate\Routing\Exceptions\UrlGenerationException;
use \Facades\Devsrv\Aquastrap\RouteLoader;

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

    public function drips() {
        $methodsToExpose = RouteLoader::methodsToBind(static::class);

        $routes = collect($methodsToExpose)
            ->mapWithKeys(function($method) {
                try {
                    $url = action([static::class, $method]);
                    return [ $method => $url ];
                } catch (InvalidArgumentException|UrlGenerationException $th) {
                    // can't figure method url
                    return [];
                }
            });

        return ['routes' => $routes, 'component' => str_replace('\\', "\\\\", (string) static::class) ];
    }
}
