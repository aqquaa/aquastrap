<?php

namespace Devsrv\Aquastrap\Exceptions;

use InvalidArgumentException;

class RequestException extends InvalidArgumentException
{
    public static function failedToInstantiate(string $component = '')
    {
        return new static("Unable to instantiate Component ". $component);
    }

    public static function missingArgs(string $component = '')
    {
        return new static("Unable to process request, Missing constructor parameters for {$component}");
    }
}
