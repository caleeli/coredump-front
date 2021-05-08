<?php

namespace Coredump\Frontend\Console\Commands;

use Illuminate\Console\Command;

class JddOnChange extends Command
{
    /**
     * The name and signature of the console command.
     *
     *
     * @var string
     */
    protected $signature = 'jdd:onchange {path} {cmd}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Listen for changes';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $watch = __DIR__ . '/../../watch/index.js';
        $path = $this->argument('path');
        $command = $this->argument('cmd');
        \passthru("node {$watch} {$path} {$command}");
    }
}
