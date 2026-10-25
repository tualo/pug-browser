<?php

namespace Tualo\Office\PugBrowser\Scopes;

use Tualo\Office\Basic\Scope;

class UserSignatureScope extends Scope
{
    protected static string $identifier = 'user_signature';
    protected static array $name = [
        'EN' => 'User Signature',
        'DE' => 'Benutzerunterschrift',
    ];
    protected static array $description = [
        'EN' => 'Access and manage user signatures.',
        'DE' => 'Benutzerunterschriften anzeigen und verwalten.',
    ];
}
