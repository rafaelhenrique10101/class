<?php
require "../../Vendor/php-activerecord/ActiveRecord.php";

ActiveRecord\Config::initialize(function ($cfg)
{
    $path = dirname(__DIR__) . "/Database/ConfigDB.ini";
    if(file_exists($path))
    {
        $paramsConfigDataBase = parse_ini_file($path);

        $cfg->set_connections(array(
            "development" => "mysql://". $paramsConfigDataBase["usuario"] .
                ":". $paramsConfigDataBase["senha"] .
                "@". $paramsConfigDataBase["servidor"] .
                "/". $paramsConfigDataBase["banco"] .""
        ));
    }

});