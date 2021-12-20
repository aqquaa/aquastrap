<?php

uses(Aqua\Aquastrap\Tests\TestCase::class)->in('Pest');

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

function isLaravel(int $version)
{
    return (int) substr( app()->version(), 0, 1 ) === $version;
}
