<?php

namespace Devsrv\Aquastrap;

class AquaDirective
{
    public static function networkHandler($drips) {
        return "_aquaGenerate('". $drips()['component'] ."')";
    }

    public static function setComponentConfig($drips) {
        return "_registerAquaConfig('". $drips()['component'] ."')";
    }

    public static function scripts() {
        $routes = asset('vendor/aquastrap/js/routes.js');
        $main = asset('vendor/aquastrap/js/index.js');

        return '<script src="'.$routes.'"></script><script src="'.$main.'"></script>';
    }
}