<?php

namespace Devsrv\Aquastrap;

class AquaDirective
{
    public static function networkHandler($drips) {
        $routes = str_replace('"', '\'', json_encode($drips()['routes']));

        return "_aquaGenerate(". $routes .", '". $drips()['component'] ."')";
    }

    public static function setComponentConfig($drips) {
        $component_id = $drips()['component'];

        return "_registerAquaConfig('". $component_id ."')";
    }

    public static function scripts() {
        $util = file_get_contents(__DIR__ . '/../resources/js/util.js');
        $script = file_get_contents(__DIR__ . '/../resources/js/script.js');
        $network = file_get_contents(__DIR__ . '/../resources/js/network.js');
        $public = file_get_contents(__DIR__ . '/../resources/js/public.js');

        return '<script>' . $util . $network . $script . $public . '</script>';
    }
}