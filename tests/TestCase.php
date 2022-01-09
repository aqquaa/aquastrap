<?php

namespace Aqua\Aquastrap\Tests;

use Aqua\Aquastrap\AquastrapServiceProvider;
use Aqua\Aquastrap\Tests\Pest\Feature\Component\Setup\ExampleBladeAquaComponent;
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\File;
use Orchestra\Testbench\TestCase as TestbenchTestCase;

class TestCase extends TestbenchTestCase
{
    use InteractsWithViews;

    protected function getPackageProviders($app)
    {
        return [
            AquastrapServiceProvider::class,
        ];
    }

    protected function setUp(): void
    {
        parent::setUp();

        Blade::component('example-blade-aqua-component', ExampleBladeAquaComponent::class);
    }

    protected function defineEnvironment($app)
    {
        $app['config']->set('view.paths', [
            __DIR__.'/Setup/views',
            resource_path('views'),
        ]);
    }

    public function withPublishedAssets(\Closure $callback)
    {
        File::deleteDirectory(public_path('vendor'));

        File::makeDirectory(public_path('vendor/aquastrap'), 0755, true);

        File::copyDirectory(__DIR__ .'/../dist/.', public_path('vendor/aquastrap'));

        return $callback();
    }
}
