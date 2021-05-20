<?php

namespace Coredump\Frontend\Http\Controllers;

use Coredump\Frontend\Managers\ModuleManager;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class FrontendController extends Controller
{
    public function home()
    {
        return view('frontend::home');
    }

    public function bpmn_template($module, $file)
    {
        $content = \file_get_contents(ModuleManager::$path . '/' . basename($module). '/' . basename($file));
        return (new Response($content, 200))
              ->header('Content-Type', 'image/svg+xml');
    }

    public function module_assets($module, $file)
    {
        $filepath = ModuleManager::$deployedPath . '/' . basename($module). '/' . basename($file);
        $content = \file_get_contents($filepath);
        $mime = \mime_content_type($filepath);
        if ($mime === 'image/svg') {
            $mime = 'image/svg+xml';
        }
        return (new Response($content, 200))
              ->header('Content-Type', $mime);
    }
}
