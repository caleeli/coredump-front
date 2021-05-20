<?php

namespace Coredump\Frontend;

use Coredump\Frontend\Console\Commands\JddAutoloaddump;
use Coredump\Frontend\Console\Commands\JddConfig;
use Coredump\Frontend\Console\Commands\JddOnChange;
use Coredump\Frontend\Console\Commands\JddPackageUpdate;
use Coredump\Frontend\Managers\ModuleManager;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class FrontendServiceProvider extends ServiceProvider
{
    const PluginName = 'coredump/frontend';

    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        /*
         * Optional methods to load your package assets
         */
        $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'frontend');
        $this->loadJsonTranslationsFrom(__DIR__.'/../resources/lang');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'frontend');
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        Route::middleware('web')
            ->group(__DIR__.'/../routes/web.php');
        $this->loadAssets();
        // Register models
        app('config')->push('jsonapi.models', 'Coredump\Frontend\Models');

        // Register bpmn files
        app('config')->push('workflow.processes', config('frontend.modules.core') . '/*/*.bpmn');

        // Register global screens
        app('config')->push('screens', config('frontend.modules.core') . '/*/*.global.vue');

        // Register Module Manager
        ModuleManager::$path = config('frontend.templates');
        app('config')->push('workflow.processes', config('frontend.modules.deployed') . '/*/*.bpmn');
        ModuleManager::$deployedPath = config('frontend.modules.deployed');
        app('config')->push('screens', config('frontend.modules.deployed') . '/*/*.global.vue');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../config/frontend.php' => config_path('frontend.php'),
            ], static::PluginName . '/config');

            // Publishing assets.
            $this->publishes([
                __DIR__.'/../dist' => public_path('modules/' . static::PluginName),
            ], static::PluginName . '/assets');

            // Registering package commands.
            $this->commands([
                JddPackageUpdate::class,
                JddAutoloaddump::class,
                JddOnChange::class,
                JddConfig::class,
            ]);
        }
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        // Automatically apply the package configuration
        app()->config["filesystems.disks.modules_deployed"] = [
            'driver' => 'local',
            'root' => config('frontend.modules.deployed'),
        ];

        // Register the main class to use with the facade
        $this->app->singleton('frontend', function () {
            return new Frontend;
        });
    }

    private function loadAssets()
    {
        foreach (glob(__DIR__ . '/../dist/js/*.js') as $filename) {
            $name = \basename($filename);
            app('config')->push('plugins.javascript', '/modules/' . self::PluginName . '/js/' . $name);
        }
        foreach (glob(__DIR__ . '/../dist/css/*.css') as $filename) {
            $name = \basename($filename);
            app('config')->push('plugins.css', '/modules/' . self::PluginName . '/css/' . $name);
        }
    }
}
