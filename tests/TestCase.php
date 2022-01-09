<?php

namespace Aqua\Aquastrap\Tests;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Blade;
use Aqua\Aquastrap\AquastrapServiceProvider;
use Orchestra\Testbench\TestCase as TestbenchTestCase;
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;
use Aqua\Aquastrap\Tests\Pest\Feature\Component\Setup\ExampleBladeAquaComponent;

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
            __DIR__.'/Pest/Feature/Setup/views',
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
