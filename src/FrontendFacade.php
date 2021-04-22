<?php

namespace Coredump\Frontend;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Coredump\Frontend\Skeleton\SkeletonClass
 */
class FrontendFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'frontend';
    }
}
