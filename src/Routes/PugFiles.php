<?php

namespace Tualo\Office\PugBrowser\Routes;

use Tualo\Office\PugBrowser\Scopes\PugJsScope;

use Tualo\Office\Basic\TualoApplication as App;
use Tualo\Office\Basic\Route as BasicRoute;
use Tualo\Office\Basic\IRoute;
use Tualo\Office\Basic\RouteSecurityHelper;

class PugFiles extends \Tualo\Office\Basic\RouteWrapper
{
    public static function scope(): string
    {
        return PugJsScope::identifier();
    }
    public static function register()
    {
        BasicRoute::add('/pugbrowser/files', function () {
            $db = App::get('session')->getDB();
            try {
                App::result('success', true);
                App::result('files', $db->direct('SELECT `id`, `template`, `allowed` FROM view_readtable_pugjs_files WHERE allowed=1'));
            } catch (\Exception $e) {
                App::result('msg', $e->getMessage());
            }
            App::contenttype('application/json');
        }, ['get'], true, [], self::scope());
    }
}
