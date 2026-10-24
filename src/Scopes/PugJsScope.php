<?php

namespace Tualo\Office\PugBrowser\Scopes;

use Tualo\Office\Basic\Scope;

class PugJsScope extends Scope
{
    protected static string $identifier = 'pugjs';
    protected static array $name = [
        'EN' => 'PugJS',
        'DE' => 'PugJS',
    ];
    protected static array $description = [
        'EN' => 'Access and manage PugJS files.',
        'DE' => 'PugJS-Dateien zugreifen und verwalten.',
    ];
}
