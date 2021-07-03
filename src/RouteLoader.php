<?php

namespace Devsrv\Aquastrap;
use Devsrv\Aquastrap\Util;
use Illuminate\Support\Facades\Route;
use Devsrv\Aquastrap\Traits\ExposeMethods;

class RouteLoader
{
    public function registerRoutes($paths = 'app/View/Components')
    {
        Util::loadClasses($paths, fn (string $className) => $this->registerRoutesForAction($className));
    }

    public function registerRoutesForAction(string $className)
    {
        if(! in_array(ExposeMethods::class, class_uses_recursive($className))) return;

        $registered = [];

        $publicMethods = array_diff(
            Util::getPublicMethods($className), 
            defined($className . '::SKIP_ROUTES') ? $className::SKIP_ROUTES : []
        );

        if(Util::hasStaticMethod($className, 'routes')) {
            $routeMaps = $className::routes();

            foreach ($routeMaps as $method => $path) {
                $this->register($className, $method, $path);

                $registered[] = $method;
            }
        }

        if($leftMethods = array_diff($publicMethods, $registered)) {
            foreach ($leftMethods as $method) {
                $this->register($className, $method);
            }
        }
    }

    private function register($className, $method, $path = null) {
        $hash = md5($className);
        $path = $path ?? 'aquastrap/' . $hash . '/' . $method;

        Route::post($path, [$className, $method])
                ->middleware(['web'])
                ->name('aquastrap.' . $hash .'@' . $method );
    }
}
