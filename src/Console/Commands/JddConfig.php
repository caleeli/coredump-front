<?php

namespace Coredump\Frontend\Console\Commands;

use function GuzzleHttp\json_encode;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class JddConfig extends Command
{
    /**
     * The name and signature of the console command.
     *
     *
     * @var string
     */
    protected $signature = 'jdd:config';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configure the application';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $appUrl = $this->ask('(APP_URL) Application URL', config('app.url'));
        $parsed = parse_url($appUrl);
        $protocol = $parsed['scheme'];
        $broadcasterHost = $parsed['host'];
        $appDebug = $this->confirm('(APP_DEBUG) Enable debug mode?', config('app.debug'));
        $broadcasterHost = $this->ask('(BROADCASTER_HOST Host) Laravel Echo Host', $broadcasterHost);
        $broadcasterPort = $this->ask('(BROADCASTER_HOST Port) Laravel Echo Port', rand(9000, 9999));
        $protocol = $this->ask('(BROADCASTER_HOST Protocol) Laravel Echo Protocol', $protocol);
        $broadcasterId = $this->ask('(BROADCASTER_ID) Laravel Echo Host', uniqid());
        $broadcasterKey = $this->ask('(BROADCASTER_KEY) Laravel Echo Host', str_replace('.', '', uniqid('', true)));

        // Save .env
        $this->setEnv('APP_URL', $appUrl);
        $this->setEnv('APP_DEBUG', $appDebug);
        $this->configDatabase();
        $this->setEnv('BROADCASTER_HOST', "{$protocol}://{$broadcasterHost}:{$broadcasterPort}");
        $this->setEnv('BROADCASTER_ID', $broadcasterId);
        $this->setEnv('BROADCASTER_KEY', $broadcasterKey);

        // Save laravel-echo-server.json
        $config = [
            'authHost' => $appUrl,
            'authEndpoint' => '/broadcasting/auth',
            'clients' => [
                [
                    'appId' => $broadcasterId,
                    'key' => $broadcasterKey
                ]
            ],
            'database' => 'redis',
            'databaseConfig' => [
                'redis' => [],
                'sqlite' => [
                    'databasePath' => '/database/laravel-echo-server.sqlite'
                ]
            ],
            'devMode' => $appDebug,
            'host' => $broadcasterHost,
            'port' => $broadcasterPort,
            'protocol' => $protocol,
            'socketio' => [],
            'sslCertPath' => '',
            'sslKeyPath' => '',
            'sslCertChainPath' => '',
            'sslPassphrase' => '',
            'subscribers' => [
                'http' => true,
                'redis' => true
            ],
            'apiOriginAllow' => [
                'allowCors' => true,
                'allowOrigin' => $appUrl,
                'allowMethods' => 'GET, POST',
                'allowHeaders' => 'Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id'
            ]
        ];
        file_put_contents('laravel-echo-server.json', json_encode($config, JSON_PRETTY_PRINT));

        Artisan::call('key:generate');
        Artisan::call('storage:link');
    }

    /**
     * Set a .env configuration
     *
     * @param string $name
     * @param string $value
     *
     * @return void
     */
    private function setEnv($name, $value)
    {
        $config = file_exists('.env') ? file_get_contents('.env') : file_get_contents('.env.example');
        $newConfig = preg_replace('/^\s*' . preg_quote($name) . '\s*=.*$/m', "$name=$value", $config);
        file_put_contents('.env', $newConfig);
    }

    private function configDatabase()
    {
        $db = $this->choice('What database you will use?', ['sqlite', 'mysql', 'pgsql'], env('DB_CONNECTION'));
        switch ($db) {
            case 'SQLite':
                $this->setEnv('DB_CONNECTION', 'sqlite');
                $this->setEnv('DB_HOST', '');
                $this->setEnv('DB_PORT', '');
                $this->setEnv('DB_DATABASE', base_path('database/database.sqlite'));
                $this->setEnv('DB_USERNAME', '');
                $this->setEnv('DB_PASSWORD', '');
                break;
            case 'MySql':
                $this->setEnv('DB_CONNECTION', 'mysql');
                $this->setEnv('DB_HOST', $this->askHost('DB Host'));
                $this->setEnv('DB_PORT', $this->askPort('DB Port', '3306'));
                $this->setEnv('DB_DATABASE', $this->ask('Database Name', env('DB_DATABASE', '')));
                $this->setEnv('DB_USERNAME', $this->askUser('DB User', 'root'));
                $this->setEnv('DB_PASSWORD', $this->secret('DB Password'));
                break;
            case 'PostgreSql':
                $this->setEnv('DB_CONNECTION', 'pgsql');
                $this->setEnv('DB_HOST', $this->askHost('DB Host'));
                $this->setEnv('DB_PORT', $this->askPort('DB Port', '5432'));
                $this->setEnv('DB_DATABASE', $this->ask('Database Name'));
                $this->setEnv('DB_USERNAME', $this->askUser('DB User', 'postgre'));
                $this->setEnv('DB_PASSWORD', '');
                break;
        }
    }

    private function askHost($question, $default = 'localhost')
    {
        return $this->askWithCompletion($question, [
            'localhost',
            '127.0.0.1',
        ], $default);
    }

    private function askPort($question, $default = '')
    {
        return $this->askWithCompletion($question, [
            '3306',
            '5432',
            '8080',
        ], $default);
    }

    private function askUser($question, $default = 'root')
    {
        return $this->askWithCompletion($question, [
            'homestead',
            'laravel',
            'postgre',
            'root',
            'su',
        ], $default);
    }
}
