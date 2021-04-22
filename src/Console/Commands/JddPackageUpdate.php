<?php

namespace Coredump\Frontend\Console\Commands;

use Coredump\Frontend\FrontendServiceProvider;
use Illuminate\Console\Command;

class JddPackageUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     *
     * @var string
     */
    protected $signature = 'coredump-front:jdd-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Coredump Frontend';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->call('vendor:publish', ['--tag' => FrontendServiceProvider::PluginName . '/assets', '--force' => true]);
    }
}
