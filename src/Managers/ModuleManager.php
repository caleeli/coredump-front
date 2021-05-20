<?php

namespace Coredump\Frontend\Managers;

use DOMDocument;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class ModuleManager
{
    public static $path;
    public static $deployedPath;

    public static function getTemplates()
    {
        $templates = [];
        foreach (glob(static::$path . '/*') as $folder) {
            $name = basename($folder);
            $files = \glob("$folder/*.bpmn");
            if ($files) {
                $main = basename($files[0]);
                $svg = substr($main, 0, -5) . '.svg';
            } else {
                $files = \glob("$folder/*.global.vue");
                if ($files) {
                    $main = basename($files[0]);
                    $svg = substr($main, 0, -4) . '.svg';
                }
            }
            if (!$files) {
                continue;
            }
            $templates[] = [
                'name' => $name,
                'main' => "{$name}/{$main}",
                'svg' => url("/bpmn_templates/{$name}/{$svg}"),
            ];
        }
        return $templates;
    }

    public static function nameToKey($name)
    {
        return \preg_replace('/\W/', '_', $name);
    }

    public static function buildAndUpload($key, $template, $data)
    {
        // Initialize output variables
        $bpmnFile = '';
        $processId = '';
        $screen = '';
        // Build template
        $folder = \basename(\dirname($template));
        if (substr($template, -5) === '.bpmn') {
            $bpmnFile = \basename($template);
        } else {
            $bpmnFile = '';
            // global screen
            $screen = \basename($template);
        }
        if ($folder === '..' || $folder === '.') {
            throw new Exception(__('Invalid template value: :template', [
                'template' => $template,
            ]));
        }
        $source = static::$path . '/' . $folder;
        $target = static::$deployedPath . '/' . $key;
        if (\file_exists($target)) {
            throw new Exception(__('Module (:key) already exists', compact('key')));
        }
        mkdir($target);
        foreach (glob("$source/*") as $file) {
            $content = \file_get_contents($file);
            $content = static::replaceTags($content, $data);
            $fileName = basename($file);
            if ($fileName === $bpmnFile) {
                $bpmnFile = $key . '.bpmn';
                $fileName = $bpmnFile;
                $dom = new DOMDocument();
                $dom->loadXML($content);
                $processId = $dom->getElementsByTagName('process')->item(0)->getAttribute('id');
                $localScreen = basename($file, '.bpmn') . '.vue';
                if (\file_exists("$source/$localScreen")) {
                    // local screen
                    $screen = './' . $localScreen;
                }
            }
            \file_put_contents("{$target}/{$fileName}", $content);
        }
        return [
            $bpmnFile,
            $processId,
            $screen,
        ];
    }

    /**
     * Replace tags in $text with $data
     * Ex: ((name))   =>   $data['name']
     *
     * @param string $text
     * @param array $data
     *
     * @return string
     */

    private static function replaceTags($text, array $data = [])
    {
        return \preg_replace_callback('/\(\(\s*(\w+)\s*\)\)/', function ($match) use ($data) {
            return Arr::get($data, $match[1], '');
        }, $text);
    }

    public static function removeModule($key)
    {
        return Storage::disk('modules_deployed')->deleteDirectory($key);
    }

    public static function getTemplateContent($path)
    {
        return \file_get_contents(static::$path . '/' . $path);
    }
}
