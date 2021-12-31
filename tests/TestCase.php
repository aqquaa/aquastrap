<?php

namespace Aqua\Aquastrap\Tests;

use Symfony\Component\Process\Process;
use Aqua\Aquastrap\AquastrapServiceProvider;
use Orchestra\Testbench\TestCase as TestbenchTestCase;
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;
use Aqua\Aquastrap\Tests\Pest\Feature\Setup\TestAquaServiceProvider;

class TestCase extends TestbenchTestCase
{
    use InteractsWithViews;

    protected function getPackageProviders($app)
    {
        return [
            AquastrapServiceProvider::class,
            TestAquaServiceProvider::class,
        ];
    }

    protected function setUp(): void
    {
        // Code before application created.

        parent::setUp();

        // Code after application created.

        // publish assets
        $process = new Process(['mkdir', public_path('vendor/aquastrap')]);
        $process->start();
        $process->wait();

        $process = new Process(['cp', '-a', __DIR__ .'/../dist/.', public_path('vendor/aquastrap')]);
        $process->start();
        $process->wait();
    }

    protected function tearDown(): void
    {
        // flush published assets
        $process = new Process(['rm', '-rf', public_path('vendor')]);
        $process->start();
        $process->wait();
        
        parent::tearDown();
    }
}
