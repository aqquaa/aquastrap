<?php

namespace Aqua\Aquastrap\Tests\Pest\Feature\Component\Setup;

use Illuminate\Support\ServiceProvider;

class TestAquaServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/views', 'aquatest');
    }

    public function register() { }
}
