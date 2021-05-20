<?php

use Coredump\Frontend\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', [FrontendController::class, 'home'])->name('home');
    Route::get('/bpmn_templates/{module}/{file}', [FrontendController::class, 'bpmn_template'])->name('templates');
    Route::get('/module_assets/{module}/{file}', [FrontendController::class, 'module_assets'])->name('module_assets');
});
