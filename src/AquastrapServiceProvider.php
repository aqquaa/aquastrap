<?php

namespace Aqua\Aquastrap;

use Aqua\Aquastrap\Contracts\DependencyLookupStore;
use Aqua\Aquastrap\DepsLookup\SessionStore;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AquastrapServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerRoutes();

        $this->registerDirectives();

        $this->app->scoped(DependencyLookupStore::class, SessionStore::class);

        if ($this->app->runningInConsole()) {
            $this->publishes([
              __DIR__.'/../config/config.php' => config_path('aquastrap.php'),
            ], 'config');

            $this->publishes([
                __DIR__.'/../dist' => public_path('vendor/aquastrap'),
            ], 'assets');
        }
    }

    protected function registerDirectives()
    {
        Blade::directive('aqua', function () {
            return "<?php 
            echo \Aqua\Aquastrap\AquaDirective::networkHandler(\$_aquaDrips);
            ?>";
        });

        Blade::directive('aquaScripts', function () {
            return "<?php 
            echo \Aqua\Aquastrap\AquaDirective::scripts();
            ?>";
        });

        Blade::directive('aquaConfig', function () {
            return "<?php 
            echo \Aqua\Aquastrap\AquaDirective::setComponentConfig(\$_aquaDrips);
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
