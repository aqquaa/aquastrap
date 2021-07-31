<?php

namespace Devsrv\Aquastrap\Traits;

use Devsrv\Aquastrap\Util;
use Illuminate\Support\Facades\Crypt;

trait ExposeMethods
{
    private function getComponentDependencies() : array {
        $constructorArgs = [];

        $componentRef = new \ReflectionClass(static::class);
        $componentConstructor = $componentRef->getConstructor();

        if($componentConstructor) {
            $data = $this->data();

            $parameters = $componentConstructor->getParameters();

            foreach($parameters as $param)
            {
                if(array_key_exists($param->name, $data)) {
                    $constructorArgs[$param->name] = $data[$param->name];
                    continue;
                }

                if($param->isDefaultValueAvailable()) {
                    $constructorArgs[$param->name] = $param->getDefaultValue();
                    continue;
                }

                throw new \RuntimeException('Aquastrap component constructor argument missing '. (string) static::class);
            }
        }

        return $constructorArgs;
    }

    private function getComponentChecksum() : string {
        $classWithNamespace = (string) static::class;
        return md5($classWithNamespace);
    }

    private function getEncComponentName() : string
    {
        return Crypt::encryptString( str_replace('\\', '.', (string) static::class) );
    }

    private function getAllowedCallableMethods() : array
    {
        return Util::getPublicMethods((string) static::class);
    }

    public function _drips() {
        return [
            'id'            => $this->getComponentChecksum(), 
            'component'     => $this->getEncComponentName(), 
            'dependency'    => $this->getComponentDependencies(), 
            'methods'       => $this->getAllowedCallableMethods()
        ];
    }
}
