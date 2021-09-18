<?php

namespace Aqua\Aquastrap\Tests;

use Aqua\Aquastrap\AquastrapServiceProvider;
use Orchestra\Testbench\TestCase as TestbenchTestCase;

class TestCase extends TestbenchTestCase
{
    protected function getPackageProviders($app)
    {
        return [
            AquastrapServiceProvider::class,
        ];
    }
}
