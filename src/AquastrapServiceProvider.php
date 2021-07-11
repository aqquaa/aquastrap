<?php

namespace Devsrv\Aquastrap;

use Illuminate\Support\ServiceProvider;
use Devsrv\Aquastrap\RouteLoader;
use Illuminate\Support\Facades\Blade;

class AquastrapServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if(! $this->app->routesAreCached()) {
            (new RouteLoader)->registerRoutes();
        }

        Blade::directive('aqua', function ($drips) {
            return "<?php 
            echo \Devsrv\Aquastrap\AquaDirective::networkHandler($drips);
            ?>";
        });

        Blade::directive('aquasync', function () {
            return "<?php 
            echo \Devsrv\Aquastrap\AquaDirective::scripts();
            ?>";
        });

        Blade::directive('aquaconfig', function ($drips) {
            return "<?php 
            echo \Devsrv\Aquastrap\AquaDirective::setComponentConfig($drips);
            ?>";
        });
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
