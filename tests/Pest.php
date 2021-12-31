<?php

uses(Aqua\Aquastrap\Tests\TestCase::class)->in('Pest');

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

function isLaravel(int $version)
{
    return (int) substr(app()->version(), 0, 1) === $version;
}

function blade(string $blade): string
{
    return eval('ob_start(); ?>' . app('blade.compiler')->compileString($blade) . ' <?php return trim(ob_get_clean());');
}