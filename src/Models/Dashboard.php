<?php

namespace Coredump\Frontend\Models;

use Coredump\Frontend\Managers\ModuleManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use JDD\Workflow\Facades\Workflow;

class Dashboard extends Model
{
    protected $fillable = [
        'name',
        'key',
        'description',
        'icon',
        'bpmn',
        'process_id',
        'screen',
        'role',
    ];

    protected $appends = [
        'screen_content',
    ];

    /**
     * Get screen_content
     *
     * @return string
     */
    private function getWorkspacePath()
    {
        if ($this->bpmn) {
            $path = dirname(Workflow::getProcessPath($this->bpmn));
            return $path;
        }
        if (\basename(($this->screen)) === $this->screen) {
            foreach (config('screens', []) as $path) {
                foreach (glob($path) as $filename) {
                    if (basename($filename) === $this->screen) {
                        return dirname($filename);
                    }
                }
            }
        }
        return '';
    }

    /**
     * Get screen_content
     *
     * @return string
     */
    public function getScreenContentAttribute()
    {
        if (substr($this->screen, 0, 2) === './' && $this->bpmn) {
            $path = $this->getWorkspacePath();
            return \file_get_contents($path . substr($this->screen, 1));
        }
        if ($this->screen && \basename($this->screen) === $this->screen) {
            $path = $this->getWorkspacePath();
            return \file_get_contents($path . '/' . $this->screen);
        }
        return '';
    }

    public function folder()
    {
        $path = $this->getWorkspacePath();
        $l = \strlen($path);
        $urlBase = '/module_assets/' . \basename($path);
        $content = $this->subfolder($path, $l, $urlBase);
        return $content;
    }

    private function subfolder($path, $l, $urlBase, array $content = [], $level = 0)
    {
        $content[] = [
            'id' => substr($path, $l),
            'name' => basename($path),
            'mime_type' => substr($path, -5) === '.bpmn' ? 'application/x-bpmn' : \mime_content_type($path),
            'url' => url($urlBase . substr($path, $l)),
            'level' => $level,
        ];
        foreach (glob("{$path}/*") as $file) {
            $content = $this->subfolder($file, $l, $urlBase, $content, $level + 1);
        }
        return $content;
    }

    public function getCode($path)
    {
        $fullpath = $this->getWorkspacePath() . $path;
        if (\is_file($fullpath) && substr(\mime_content_type($fullpath), 0, 5) === "text/") {
            return \file_get_contents($fullpath);
        }
    }

    public function saveBpmn($path, $bpmn, $svg)
    {
        $fullpath = $this->getWorkspacePath() . $path;
        \file_put_contents($fullpath, $bpmn);
        \file_put_contents(substr($fullpath, 0, -5) . '.svg', $svg);
    }

    public function saveCode($path, $code)
    {
        $fullpath = $this->getWorkspacePath() . $path;
        \file_put_contents($fullpath, $code);
    }

    public function uploadAssets($files)
    {
        $fullpath = $this->getWorkspacePath();
        $name = basename($fullpath);
        $res = [$fullpath, $name];
        foreach ($files as $file) {
            list($meta, $content) = explode('base64,', $file['content'], 2);
            $content = \base64_decode($content);
            Storage::disk('modules_deployed')->put($name . '/' . $file['name'], $content);
            $res[] = $name . '/' . $file['name'];
        }
        return $res;
    }

    public function getViewTemplates()
    {
        $templates = ModuleManager::getTemplates();
        return \array_filter($templates, function ($tpl) {
            return  substr($tpl['main'], -4) === '.vue';
        });
    }

    public function createFromTemplate($name, $template)
    {
        $fullpath = $this->getWorkspacePath();
        $base = basename($fullpath);
        $content = ModuleManager::getTemplateContent($template['main']);
        Storage::disk('modules_deployed')->put($base . '/' . $name, $content);
        return [
            $base . '/' . $name, $content
        ];
    }
}
