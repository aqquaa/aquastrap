<?php

namespace Aqua\Aquastrap;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AquastrapServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerDirectives();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../dist' => public_path('vendor/aquastrap'),
            ], 'assets');
        }
    }

    protected function registerDirectives()
    {
        Blade::directive('aquaScripts', function () {
            return "<?php 
            echo \Aqua\Aquastrap\AquaDirective::scripts();
            ?>";
        });
    }
}
