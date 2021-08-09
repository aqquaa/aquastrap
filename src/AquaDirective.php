<?php

namespace Devsrv\Aquastrap;

class AquaDirective
{
    public static function networkHandler($drips) {
        $id         = "'". $drips()['id'] . "'";
        $ingredient = "'". $drips()['ingredient'] . "'";
        $methods    = str_replace('"', '\'', json_encode($drips()['methods'], JSON_FORCE_OBJECT));

        return "_aquaGenerate(". $id .", ". $ingredient .", ". $methods .")";
    }

    public static function setComponentConfig($drips) {
        return "_registerAquaConfig('". $drips()['id'] ."')";
    }

    public static function linkComponent($link) {
        return [
            'id' => md5('test'),
            'ingredient' => md5('test'),
            'methods' => ['deletex'],
        ];
    }

    public static function scripts() {
        $aquaroute  = '<script>window._aquaroute = "'. route('aquastrap.request') .'";</script>';

        $store      = asset('vendor/aquastrap/js/store.js');
        $mainScript = asset('vendor/aquastrap/js/index.js');

        return $aquaroute . '<script src="'.$store.'"></script>' . '<script src="'.$mainScript.'"></script>';
    }
}