<?php

namespace Devsrv\Aquastrap;
use Devsrv\Aquastrap\Util;
use Illuminate\Support\Facades\Route;
use Devsrv\Aquastrap\Traits\ExposeMethods;
use Illuminate\Routing\Router;
use InvalidArgumentException;
use Illuminate\Routing\Exceptions\UrlGenerationException;

class RouteLoader
{
    public function registerRoutes($paths = 'app/View/Components')
    {
        Util::loadClasses($paths, fn (string $className) => $this->registerRoutesForAction($className));
    }

    public function registerRoutesForAction(string $className)
    {
        if(! $this->shouldRegister($className)) return;

        if(Util::hasStaticMethod($className, 'routes')) { $className::routes(app(Router::class)); }

        $methods = $this->methodsToBind($className);

        foreach ($methods as $method) {
            if($this->alreadyRegistered($className, $method)) continue;

            $this->register($className, $method);
        }
    }

    private function register($className, $method, $path = null) {
        $hash = md5($className);
        $path = $path ?? 'aquastrap/' . $hash . '/' . $method;

        Route::post($path, [$className, $method])
                ->middleware(['web']);
    }

    private function shouldRegister(string $className) : bool {
        return in_array(ExposeMethods::class, class_uses_recursive($className));
    }

    public function methodsToBind(string $className) : array {
        return array_diff(
            Util::getPublicMethods($className), 
            defined($className . '::SKIP_ROUTES') ? $className::SKIP_ROUTES : []
        );
    }

    private function alreadyRegistered(string $className, string $method) : bool {
        try { if(action([$className, $method])) return true; } 
        catch (InvalidArgumentException $th) { return false; }
        catch (UrlGenerationException $e) { return true; }

        return true;
    }
}
