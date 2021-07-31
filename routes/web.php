<?php

use Illuminate\Support\Facades\Route;

Route::post('/aquastrap/request', [\Devsrv\Aquastrap\AquaRoute::class, 'Process'])->name('aquastrap.request');