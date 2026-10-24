<?php

namespace Tualo\Office\PugBrowser\Routes;

use Tualo\Office\Basic\TualoApplication as App;
use Tualo\Office\Basic\Route as BasicRoute;
use Tualo\Office\Basic\IRoute;
use Tualo\Office\Basic\RouteSecurityHelper;

class JsLoader extends \Tualo\Office\Basic\RouteWrapper
{
    public static function register()
    {
        BasicRoute::add('/jspugbrowser/(?P<lib>[\w.\-]+)/(?P<file>[\w.\/\-]+)', function ($matches) {
            $path = dirname(__DIR__, 1) . '/js/lazy';

            if ($matches['lib'] == 'lib') {
                $path = dirname(__DIR__, 1) . '/js/lib';
            }
            if (file_exists($path . '/' . $matches['file'])) {
                RouteSecurityHelper::serveSecureStaticFile(
                    $matches['file'],
                    $path . '/',
                    ['js'],
                    ['js' => 'application/javascript']
                );
            }
        }, ['get'], false);
    }
}
