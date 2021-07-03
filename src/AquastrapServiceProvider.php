<?php

namespace Devsrv\Aquastrap;

use Illuminate\Support\ServiceProvider;
use Devsrv\Aquastrap\RouteLoader;

class AquastrapServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if(! $this->app->routesAreCached()) {
            (new RouteLoader)->registerRoutes();
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
