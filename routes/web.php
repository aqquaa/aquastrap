<?php

use Illuminate\Support\Facades\Route;

Route::any('/aquastrap', [\Aqua\Aquastrap\AquaRoute::class, 'Process'])->name('aquastrap.request');