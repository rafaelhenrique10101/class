<?php

namespace Config\Database;

use Exception;
use PDO;

final class DBConnection
{
    private static $Con;

    private function __construct()
    {
    }

    private function __clone()
    {

    }

    private function __wakeup()
    {
    }


    /**
     * @param $fileConfigDB
     * @return PDO $Con
     * @throws Exception
     */

    public static function getInstance($fileConfigDB)
    {
        if (self::$Con == NULL) {
            self::$Con = self::getConnection(self::loadFileConfigDB($fileConfigDB));
            self::$Con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$Con->exec("set names utf8");
            return self::$Con;
        } else {
            return self::$Con;
        }
    }

    /**
     * @param $fileConfigDB
     * @return array
     * @throws Exception
     */

    private static function loadFileConfigDB($fileConfigDB): array
    {
        if (file_exists($fileConfigDB)) {
            $paramsConfigDataBase = parse_ini_file($fileConfigDB);
        } else {
            throw new Exception('Arquivo de configuração do banco de dados não encontrado');
        }

        return $paramsConfigDataBase;
    }

    /**
     * @param $params array
     * @return PDO
     * @throws Exception
     */

    private static function getConnection(array $params): PDO
    {
        $sgdb = isset($params['sgdb']) ? $params['sgdb'] : NULL;
        $user = isset($params['usuario']) ? $params['usuario'] : NULL;
        $pass = isset($params['senha']) ? $params['senha'] : NULL;
        $dbName = isset($params['banco']) ? $params['banco'] : NULL;
        $server = isset($params['servidor']) ? $params['servidor'] : NULL;
        $port = isset($params['porta']) ? $params['porta'] : NULL;

        if (!is_null($sgdb)) {
            if (strtoupper($sgdb) == "MYSQL") {
                $port = isset($port) ? $port : 3306;
                return new PDO("mysql:host={$server};port={$port};dbname={$dbName}", $user, $pass);
            } elseif (strtoupper($sgdb) == "MSSQL") {
                $port = isset($port) ? $port : 1433;
                return new PDO("mssql:host={$server},{$port};dbname={$dbName}", $user, $pass);
            } elseif (strtoupper($sgdb) == "PGSQL") {
                $port = isset($port) ? $port : 5432;
                return new PDO("pgsql:dbname={$dbName}; user={$user}; password={$pass}, host={$server};port={$port}");
            } elseif (strtoupper($sgdb) == "SQLITE") {
                return new PDO("sqlite:{$dbName}");
            } elseif (strtoupper($sgdb) == "OCI8") {
                return new PDO("oci:dbname={$dbName}", $user, $pass);
            } elseif (strtoupper($sgdb) == "FIREBIRD") {
                return new PDO("firebird:dbname={$dbName}", $user, $pass);
            }
        } else {
            throw new Exception('Erro: tipo de banco de dados não informado');
        }
    }
}