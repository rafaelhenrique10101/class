<?php

spl_autoload_register("autoloader");

function autoloader($class) {
    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    if (file_exists(__DIR__ . "/" . $file)) {
        require $file;
        return true;
    }
    return false;
}
