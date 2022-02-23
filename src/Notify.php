<?php

namespace Aqua\Aquastrap;

use Illuminate\Http\Response as HttpResponse;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class Notify
{
    /**
     * send notification message via header along with response payload
     * @return Illuminate\Http\Response
     */
    public function __invoke(string $message, string $type = 'info'): HttpResponse
    {
        return (new HttpResponse())
            ->setStatusCode(SymfonyResponse::HTTP_OK)
            ->setContent([])
            ->withHeaders([
                'X-Aqua-Notification' => json_encode(['type' => $type, 'message' => $message]),
            ]);
    }
}
