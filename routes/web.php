<?php

use Illuminate\Support\Facades\Route;

Route::any('/aquastrap', [\Devsrv\Aquastrap\AquaRoute::class, 'Process'])->name('aquastrap.request');