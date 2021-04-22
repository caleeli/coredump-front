<?php

namespace Coredump\Frontend\Http\Controllers;

use Illuminate\Routing\Controller;

class FrontendController extends Controller
{
    public function login()
    {
        return view('frontend::login');
    }
}
