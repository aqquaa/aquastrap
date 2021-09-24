<?php

namespace Aqua\Aquastrap\Traits;

use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Illuminate\Http\Response as HttpResponse;
use \stdClass;

trait Notification
{
    public ?stdClass $notify = null;

    /**
     * [method_name => $type]
     */
    protected static $NOTIFICATION_TYPE = [
        'info'    => 'info',
        'success' => 'success',
        'warning' => 'warning',
        'danger'  => 'danger',
    ];

    public function __call($name, $arguments)
    {
        if(array_key_exists($name, self::$NOTIFICATION_TYPE)) {
            $this->setNotification(self::$NOTIFICATION_TYPE[$name], reset($arguments));

            return $this->aquaNotification();
        }
    }

    /**
     * send notification message via header along with response payload
     * @return Illuminate\Http\Response
     */
    protected function aquaNotification() : HttpResponse {
        return (new HttpResponse())
            ->setStatusCode(SymfonyResponse::HTTP_OK)
            ->setContent([])
            ->withHeaders([
                'X-Aqua-Notification' => json_encode(['type' => $this->notify->type, 'message' => $this->notify->message])
            ]);
    }

    /**
     * set notification message
     * @param string $type 'info' | 'success' | 'warning' | 'danger'
     * @param string $message the notification message
     * @return self
     */
    protected function setNotification(string $type, ?string $message = '') : self {
        $notification = new stdClass;
        $notification->type = in_array($type, self::$NOTIFICATION_TYPE) ? $type : 'info';
        $notification->message = $message;

        $this->notify = $notification;

        return $this;
    }
}
