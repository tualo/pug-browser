<?php

namespace Tualo\Office\PugBrowser\Middlewares;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\IMiddleware;

class Middleware implements IMiddleware
{
    public static function register()
    {
        TualoApplication::use('pug-browser', function () {
            try {
                TualoApplication::javascript('pug-browser-lib', "./jspugbrowser/lib/pugjs/pug.js", []);
                TualoApplication::module('pug-browser', "./jspugbrowser/lib/zenfs/app.js", []);
            } catch (\Exception $e) {
                TualoApplication::set('maintanceMode', 'on');
                TualoApplication::addError($e->getMessage());
            }
        }, -100, [
            'needActiveSession' => true,
        ]); // should be one of the last
    }
}
