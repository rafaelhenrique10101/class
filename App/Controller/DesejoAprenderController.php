<?php

namespace App\Controller;

use App\Model\DesejoAprender;
use Exception;

class DesejoAprenderController
{

    /**
     * @param array $params
     * @param $idUser
     * @return bool
     */
    public function insertChips(array $params, $idUser): bool
    {
        try {

            $oDesejoAprenderModel = new DesejoAprender();

            $oDesejoAprenderModel->itens = $params;
            $oDesejoAprenderModel->idUser = $idUser;
            $oDesejoAprenderModel->created = date("Y-m-d H:i:s");

            return $oDesejoAprenderModel->saveChips() ? true : false;

        } catch (Exception $exception) {

        }
    }


    /**
     * Controller que obtém os dados passados pelo JS e manda para
     * o model para persistir e carregar os chips
     * @param $idUser
     * @return array
     * @throws Exception
     */

    public function loadChips($idUser): array
    {
        try {
            $oDesejoAprenderModel = new DesejoAprender();

            $oDesejoAprenderModel->idUser = $idUser;

            if($result = $oDesejoAprenderModel->loadChips())
            {
                return $result;
            }

        } catch (Exception $exception) {

        }
    }


    /**
     * Controller que obtém os dados passados pelo JS e manda para
     * o model para persistir e excluir um chip
     * @param $id
     * @return bool
     * @throws Exception
     */

    public function deleteChip($id): bool
    {
        try {

        } catch (Exception $exception) {

        }
    }
}