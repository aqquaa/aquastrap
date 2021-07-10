<?php

namespace Devsrv\Aquastrap\Traits;

use Devsrv\Aquastrap\Util;
use Illuminate\Routing\ControllerMiddlewareOptions;

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
        $hash = md5(get_class($this));

        $methodsToExpose = array_diff(
            Util::getPublicMethods(get_class($this)),
            defined(get_class($this) . '::SKIP_ROUTES') ? self::SKIP_ROUTES : []
        );

        return collect($methodsToExpose)
            ->mapWithKeys(fn($method) => [$method => route('aquastrap.' . $hash . '@' . $method)]);
    }
}
