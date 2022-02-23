<?php

namespace Aqua\Aquastrap\Traits;

use Illuminate\Support\Facades\RateLimiter;
use Aqua\Aquastrap\Exceptions\TooManyRequestsException;

trait RateLimit
{
    protected function getRateLimitKey($method)
    {
        if (! $method) $method = debug_backtrace()[1]['function'];

        return static::class.'|'.$method.'|'.request()->ip();
    }

    protected function clearRateLimiter($method = null)
    {
        if (! $method) $method = debug_backtrace()[1]['function'];

        $key = $this->getRateLimitKey($method);

        RateLimiter::clear($key);
    }

    protected function hitRateLimiter($method = null, $decaySeconds = 60)
    {
        if (! $method) $method = debug_backtrace()[1]['function'];

        $key = $this->getRateLimitKey($method);

        RateLimiter::hit($key, $decaySeconds);
    }

    protected function rateLimit($maxAttempts, $decaySeconds = 60)
    {
        $method = debug_backtrace()[1]['function'];

        $key = $this->getRateLimitKey($method);

        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            $component = static::class;
            $ip = request()->ip();
            $secondsUntilAvailable = RateLimiter::availableIn($key);

            throw new TooManyRequestsException($component, $method, $ip, $secondsUntilAvailable);
        }

        $this->hitRateLimiter($method, $decaySeconds);
    }
}
