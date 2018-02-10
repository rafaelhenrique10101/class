<?php

namespace App\Model;

use App\Model\ActiveRecord\DesejoAprenderAR;

class DesejoAprender
{
    public $id;
    public $idUser;
    public $itens;
    public $created;
    public $conditions;

    public function __construct()
    {

    }

    /** Função que persiste os dados de chips inseridos pelo usuário
     * @return bool
     */
    public function saveChips(): bool
    {

        $oDesejoAprenderAR = new DesejoAprenderAR();

        $oDesejoAprenderAR->id_usuario = $this->idUser;
        $oDesejoAprenderAR->item = $this->itens;
        $oDesejoAprenderAR->created = $this->created;

        if (DesejoAprenderAR::create($oDesejoAprenderAR->to_array())) {
            return true;
        } else {
            return false;
        }
    }


    /** Função que deleta os dados de chips inseridos pelo usuário
     * @return bool
     */
    public function deleteChips(): bool
    {
        //DesejoAprenderAR::delete_all($id->to_array());
    }


    /** Função que deleta os dados de chips inseridos pelo usuário
     * @return array
     */
    public function loadChips(): array
    {        
        $this->conditions = array(
            "conditions" => array(
                "id_usuario = ?", $this->idUser
            )
        );

        if ($result = DesejoAprenderAR::all($this->conditions)) {
            return $result;
        } else {
            return $result;
        }
    }
}