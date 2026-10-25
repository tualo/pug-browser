<?php

namespace Tualo\Office\PugBrowser\Routes;

use Tualo\Office\PugBrowser\Scopes\UserSignatureScope;

use Tualo\Office\Basic\TualoApplication as App;
use Tualo\Office\Basic\Route as BasicRoute;
use Tualo\Office\PugBrowser\UserSignature as UserSignatureClass;

class UserSignature extends \Tualo\Office\Basic\RouteWrapper
{
    public static function scope(): string
    {
        return UserSignatureScope::identifier();
    }
    public static function register()
    {
        BasicRoute::add('/usersignature/(?P<login>[\x20-\x2E\x30-\x7E]+)', function ($matches) {
            $db = App::get('session')->getDB();
            try {

                App::result('success', true);
                App::result('login', urlencode($matches['login']));
                App::result('result', UserSignatureClass::fn()(urldecode($matches['login'])));
            } catch (\Exception $e) {
                App::result('msg', $e->getMessage());
            }
            App::contenttype('application/json');
        }, ['get'], true, [], self::scope());
    }
}
