<?php

namespace Aqua\Aquastrap\Tests;

use Illuminate\Support\Facades\Blade;
use Symfony\Component\Process\Process;
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

    public function withPublishedAssets(): void
    {
        // flush any previous published assets
        $process = new Process(['rm', '-rf', public_path('vendor')]);
        $process->start();
        $process->wait();

        // publish assets
        $process = new Process(['mkdir', public_path('vendor/aquastrap')]);
        $process->start();
        $process->wait();

        $process = new Process(['cp', '-a', __DIR__ .'/../dist/.', public_path('vendor/aquastrap')]);
        $process->start();
        $process->wait();
    }
}
