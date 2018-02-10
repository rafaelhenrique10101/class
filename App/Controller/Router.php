<?php
session_start();

const _TRUE = "true";
const _FALSE = "false";

if (isset($_POST["p_Controller"]) && isset($_POST["p_Action"]))
{
    $controller  = !empty($_POST["p_Controller"]) ? $_POST["p_Controller"] : NULL;
    $action = !empty($_POST["p_Action"]) ? $_POST["p_Action"] : NULL;
    $params = !empty($_POST["p_Params"]) ? $_POST["p_Params"] : NULL;
    $fileController = $controller . ".php";

    require_once ($fileController);

    if (class_exists($controller))
    {
        $objController = new $controller;

        if ($action)
        {
            if (method_exists($objController, $action))
            {
                if ($params)
                {
                    call_user_func_array(array($objController, $action), array($params)) ? _TRUE : _FALSE;
                }
                else
                {
                    call_user_func(array($objController, $action));
                }
            }
        }
    }
}