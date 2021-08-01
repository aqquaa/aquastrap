<?php

namespace Devsrv\Aquastrap;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\{ Blade, Route };

class AquastrapServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerRoutes();

        $this->registerDirectives();

        if ($this->app->runningInConsole()) {
            $this->publishes([
              __DIR__.'/../config/config.php' => config_path('aquastrap.php'),
            ], 'config');
        }
    }

    protected function registerDirectives() {
        Blade::directive('aqua', function () {
            return "<?php 
            echo \Devsrv\Aquastrap\AquaDirective::networkHandler(\$_drips);
            ?>";
        });

        Blade::directive('aquaScripts', function () {
            return "<?php 
            echo \Devsrv\Aquastrap\AquaDirective::scripts();
            ?>";
        });

        Blade::directive('aquaConfig', function () {
            return "<?php 
            echo \Devsrv\Aquastrap\AquaDirective::setComponentConfig(\$_drips);
            ?>";
        });
    }

    protected function registerRoutes()
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        });
    }

    protected function routeConfiguration()
    {
        return [
            'middleware' => array_merge(['web'], config('aquastrap.middleware')),
        ];
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/config.php', 'aquastrap');
    }
}
