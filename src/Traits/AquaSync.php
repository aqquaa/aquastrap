<?php

namespace Aqua\Aquastrap\Traits;

use Illuminate\Http\JsonResponse;
use Aqua\Aquastrap\GenerateRecipe;
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
     */
    protected function aquaRecipes() : array {
        return [
            '_aquaDrips' => (new GenerateRecipe((string) self::class))->make($this)
        ];
    }
}
