<?php

use Coredump\Frontend\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;

Route::get('login', [FrontendController::class, 'login']);
