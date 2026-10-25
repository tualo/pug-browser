<?php

namespace Tualo\Office\PugBrowser;

use Tualo\Office\PUG\IPUGFunction;
use Tualo\Office\DS\DSFiles;
use Tualo\Office\DS\DSTable;

class UserSignature implements IPUGFunction
{

    public static function register()
    {

        return [
            'pug_name' => 'user_signature',
            'function' => self::fn()
        ];
    }

    public static function fn(): mixed
    {
        return function (string $login): array {

            $result = [];
            $login_record = DSTable::instance('view_session_loginnamen')->f('login', 'eq', $login)->getSingle();
            try {
                $mitarbeiter = DSTable::instance('mitarbeiter')->f('user_login', 'eq', $login)->getSingle();
            } catch (\Exception $e) {
                $mitarbeiter = null;
            }
            if (!empty($mitarbeiter)) {
                $result['mitarbeiter'] = $mitarbeiter;
            }
            $profil_bilder_record = DSTable::instance('profil_bilder')->f('login', 'eq', $login)->f('typ', 'eq', 'signature')->getSingle();
            if (!empty($profil_bilder_record)) {
                $profil_bilder = DSFiles::instance('profil_bilder')->getBase64('id', $profil_bilder_record['id'], false);
            }
            if (!empty($profil_bilder)) {
                $result['signature'] = $profil_bilder;
            }
            if (!empty($login_record)) {
                $result['login'] = $login_record;
            }


            return $result;
        };
    }
}
