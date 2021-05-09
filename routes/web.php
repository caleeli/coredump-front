<?php

use Coredump\Frontend\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', [FrontendController::class, 'login'])->name('home');
});
