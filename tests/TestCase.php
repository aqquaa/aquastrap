<?php

namespace Aqua\Aquastrap\Tests;

use Aqua\Aquastrap\AquastrapServiceProvider;
use Aqua\Aquastrap\Tests\Pest\Feature\Setup\TestAquaServiceProvider;
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;
use Orchestra\Testbench\TestCase as TestbenchTestCase;
use Symfony\Component\Process\Process;

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
