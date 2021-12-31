<?php

namespace Aqua\Aquastrap\Tests;

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
}
