<?php

use Illuminate\Support\Facades\Route;

Route::any('/aquastrap/request', [\Devsrv\Aquastrap\AquaRoute::class, 'Process'])->name('aquastrap.request');