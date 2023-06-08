<?php

namespace Aqua\Aquastrap;

class AquaDirective
{
    public static function scripts()
    {
        $scripts = '';

        $manifest = json_decode(file_get_contents(public_path('vendor/aquastrap/manifest.json')), true);

        $scripts .= '<script src="'.asset('vendor/aquastrap/js/aquastrap.js?id=' . $manifest['buildId']).'"></script>' . PHP_EOL;
        $scripts .= '<script>function AquaRequest() {return new _LaraAquastrap}</script>' . PHP_EOL;

        return $scripts;
    }
}
