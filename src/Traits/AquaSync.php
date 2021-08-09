<?php

namespace Devsrv\Aquastrap\Traits;

use Illuminate\Http\JsonResponse;
use Devsrv\Aquastrap\GenerateRecipe;
use Illuminate\Support\Facades\Response;

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

    /**
     * I need $_aquaDrips to be available in the view
     * 
     * useful for Blade components as any public method is automatically converted
     * to callable variable in the view i.e nothing extra needed to link the view
     * with the class
     */
    public function _aquaDrips() : array {
        return (new GenerateRecipe((string) self::class))->make($this);
    }

    /**
     * I need $_aquaDrips to be available in the view
     * 
     * when not using Blade component this method is handy for making
     * $_aquaDrips available
     */
    protected function aquaRecipes() : array {
        return [
            '_aquaDrips' => fn() => (new GenerateRecipe((string) self::class))->make($this)
        ];
    }
}
