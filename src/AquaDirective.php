<?php

namespace Devsrv\Aquastrap;

use Devsrv\Aquastrap\GenerateRecipe;

class AquaDirective
{
    public static function networkHandler($drips) {
        $id         = "'". $drips['id'] . "'";
        $key        = "'". $drips['key'] . "'";
        $ingredient = "'". $drips['ingredient'] . "'";
        $methods    = str_replace('"', '\'', json_encode($drips['methods'], JSON_FORCE_OBJECT));

        return "_aquaGenerate(". $id .", ". $key . ", ". $ingredient .", ". $methods .")";
    }

    public static function setComponentConfig($drips) {
        return "_registerAquaConfig('". $drips['id'] ."')";
    }

    public static function linkComponent($link) {
        $class = is_array($link) ? $link[0] : $link;
        $dependencies = is_array($link) && isset($link[1]) ? $link[1] : [];
        
        return (new GenerateRecipe($class))->makeWithSuppliedDependencies($dependencies);
    }

    public static function scripts() {
        $aquaroute  = '<script>window._aquaroute = "'. route('aquastrap.request') .'";</script>';

        $store      = asset('vendor/aquastrap/js/store.js');
        $mainScript = asset('vendor/aquastrap/js/index.js');

        return $aquaroute . '<script src="'.$store.'"></script>' . '<script src="'.$mainScript.'"></script>';
    }
}