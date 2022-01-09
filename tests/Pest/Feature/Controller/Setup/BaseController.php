<?php

namespace Aqua\Aquastrap\Tests\Pest\Feature\Controller\Setup;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as IlluminateController;

class BaseController extends IlluminateController
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;
}
