<?php

namespace Coredump\Frontend\Tests;

use Orchestra\Testbench\TestCase;
use Coredump\Frontend\FrontendServiceProvider;

class ExampleTest extends TestCase
{

    protected function getPackageProviders($app)
    {
        return [FrontendServiceProvider::class];
    }
    
    /** @test */
    public function true_is_true()
    {
        $this->assertTrue(true);
    }
}
