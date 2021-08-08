<?php

namespace Devsrv\Aquastrap\Traits;

use Devsrv\Aquastrap\Util;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;
use Opis\Closure\SerializableClosure;
use Devsrv\Aquastrap\Crypt\Crypt;

trait AquaSync
{
    /**
     * send notification message along with response payload
     * @param string $type 'info' | 'success' | 'warning' | 'danger'
     * @param string $message the notification message
     * @param array $payload response data to send
     * @return Illuminate\Http\JsonResponse
     */
    protected function withAquaNotification(string $type, string $message, array $payload = []) : JsonResponse {
        return Response::json($payload)
            ->withHeaders([
                'X-Aqua-Notification' => json_encode(['type' => $type, 'message' => $message])
            ]);
    }

    public function success(string $message, array $payload = []) : JsonResponse { return $this->withAquaNotification('success', $message, $payload); }
    public function warning(string $message, array $payload = []) : JsonResponse { return $this->withAquaNotification('warning', $message, $payload); }
    public function info(string $message, array $payload = []) :    JsonResponse { return $this->withAquaNotification('info', $message, $payload); }
    public function danger(string $message, array $payload = []) :  JsonResponse { return $this->withAquaNotification('danger', $message, $payload); }

    private function serializeDeps(array $dependencies) : array {
        foreach($dependencies as $key => $dependency) {
            $dependencies[$key] = $dependency instanceof \Closure ?
                                serialize(new SerializableClosure($dependency)) : serialize($dependency);
        }

        return $dependencies;
    }

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

        return $this->serializeDeps($constructorArgs);
    }

    private function getComponentChecksum() : string {
        $classWithNamespace = (string) static::class;
        return md5($classWithNamespace);
    }

    private function getComponentNameWithNS() : string
    {
        return str_replace('\\', '.', (string) static::class);
    }

    private function getComponentIngredient() : string
    {
        $payload = base64_encode(serialize([
                'class' => $this->getComponentNameWithNS(),
                'dependencies' => $this->getComponentDependencies()
            ]
        ));

        return Crypt::Encrypt($payload);
    }

    private function getAllowedCallableMethods() : array
    {
        return Util::getPublicMethods((string) static::class);
    }

    public function _drips() : array {
        return [
            'id'            => $this->getComponentChecksum(), 
            'ingredient'    => $this->getComponentIngredient(), 
            'methods'       => $this->getAllowedCallableMethods()
        ];
    }
}
