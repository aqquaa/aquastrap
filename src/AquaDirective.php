<?php

namespace Devsrv\Aquastrap;

class AquaDirective
{
    public static function networkHandler($drips) {
        return "_aquaGenerate(". json_encode($drips()['routes']) .", '". $drips()['component'] ."')";
    }

    public static function setComponentConfig($drips) {
        $component_id = $drips()['component'];

        return "_registerAquaConfig('". $component_id ."')";
    }

    public static function setGlobalConfig() {
        return "_registerAquaConfig()";
    }

    public static function scripts() {
        return '<script>' . file_get_contents(__DIR__ . '/../resources/stubs/scripts.stub') . '</script>';
    }
}