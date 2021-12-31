<?php

namespace Aqua\Aquastrap;

class AquaDirective
{
    public static function networkHandler($drips)
    {
        $id = "'". $drips['id'] . "'";
        $key = "'". $drips['key'] . "'";
        $ingredient = "'". $drips['ingredient'] . "'";
        $methods = str_replace('"', '\'', json_encode($drips['methods'], JSON_FORCE_OBJECT));

        return "_aquaGenerate(". $id .", ". $key . ", ". $ingredient .", ". $methods .")";
    }

    public static function setComponentConfig($drips)
    {
        return "_registerAquaConfig('". $drips['id'] ."')";
    }

    public static function scripts()
    {
        $scripts = '<script>window._aquaroute = "'. route('aquastrap.request') .'";</script>' . PHP_EOL;

        $manifest = json_decode(file_get_contents(public_path('vendor/aquastrap/mix-manifest.json')), true);

        foreach ($manifest as $assetPath) {
            $scripts .= '<script src="'.asset('vendor/aquastrap' . $assetPath).'"></script>' . PHP_EOL;
        }

        return $scripts;
    }
}
