<?php

namespace Tualo\Office\PugBrowser\Middlewares;

use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\IMiddleware;

class Middleware implements IMiddleware
{
    public static function register()
    {
        TualoApplication::use('monacoeditor', function () {
            try {
                TualoApplication::module('pug-browser', "
  import { fs,configureSingle, WebStorage } from './jspugbrowser/lib/zenfs/zenfs.js';
  await configureSingle({ backend: WebStorage });
  fs.writeFileSync('/test.txt', 'Hallo aus ZenFS!');
  console.log(fs.readFileSync('/test.txt', 'utf8'));", []);
            } catch (\Exception $e) {
                TualoApplication::set('maintanceMode', 'on');
                TualoApplication::addError($e->getMessage());
            }
        }, -100, [
            'needActiveSession' => true,
        ]); // should be one of the last
    }
}
