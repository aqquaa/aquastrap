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
        $util = file_get_contents(__DIR__ . '/../resources/js/util.js');
        $script = file_get_contents(__DIR__ . '/../resources/js/script.js');
        $network = file_get_contents(__DIR__ . '/../resources/js/network.js');
        $public = file_get_contents(__DIR__ . '/../resources/js/public.js');

        return '<script>' . $util . $network . $script . $public . '</script>';
    }
}