/**************************************************************************************************
 * Objetivo: Arquivo responável pela padronizção de variáveis globais utilizadas no projeto
 * Data: 04/06/24
 * Autor: Maria Clara Furtado
 * Versão 1.0
 ************************************************************************************************/


 /**********************Mensagens de ERROS *****************************/ 

const ERROR_INVALID_ID         = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!'};
const ERROR_REQUIRED_FIELDS    = {status: false, status_code: 400, message: 'Existem campos requiridos que não foram preenchidos, ou que não atende ao critério de digitação!!'};
const ERROR_NOT_FOUND          = {status: false, status_code: 404, message: 'Não foram encontrados item ns requisição!!'};
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido ao um problema na comunicação com o banc de dados. Contate o ADM da API !!'};
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido ao um problema na camada de negocio. Contate o ADM da API !!'};
const ERRROR_CONTENT_TYPE      = {status: false, status_code: 415, message: 'O content-type encaminhado na requisição não é permitido pelo servidor da API. Deve-se utilizar somente application/json!!'};


/**********************Mensagens de SUCESSO *****************************/ 

const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso!!'};

module.exports = { 
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERRROR_CONTENT_TYPE ,
    SUCESS_CREATED_ITEM 
}
