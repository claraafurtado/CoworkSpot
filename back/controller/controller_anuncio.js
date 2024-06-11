const message = require('../modulo/config.js');
const filmeDAO = require('../model/dao/anuncio.js');

const setInserirNovoAnuncio = async function(dadosAnuncio, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let novoAnuncioJson = {};

            if (!dadosAnuncio.nome || dadosAnuncio.nome.length > 300 ||
                !dadosAnuncio.endereco || dadosAnuncio.endereco.length > 65000 ||
                !dadosAnuncio.descricao || dadosAnuncio.descricao.length > 6500 ||
                dadosAnuncio.valor.length > 6 ||
                !dadosAnuncio.foto || dadosAnuncio.foto.length > 800) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            }

            let novoAnuncio = await filmeDAO.insertAnuncio(dadosAnuncio);

            if (novoAnuncio) {
                let idUltimo = await filmeDAO.selectLastId();
                dadosAnuncio.id = idUltimo[0].id;

                novoAnuncioJson.anuncio = dadosAnuncio;
                novoAnuncioJson.status = message.SUCESS_CREATED_ITEM.status;
                novoAnuncioJson.status_code = message.SUCESS_CREATED_ITEM.status_code;
                novoAnuncioJson.message = message.SUCESS_CREATED_ITEM.message;

                return novoAnuncioJson; // 201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

const getListarAnuncio = async function() {
    try {
        let anuncioJSON = {};
        let dadosAnuncio = await filmeDAO.selectAllAnuncio();

        if (dadosAnuncio) {
            if (dadosAnuncio.length > 0) {
                anuncioJSON.filmes = dadosAnuncio;
                anuncioJSON.quantidade = dadosAnuncio.length;
                anuncioJSON.status_code = 200;
                return anuncioJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getBuscarAnuncioNome = async function(nome) {
    try {
        let nomeAnuncio = nome;
        let anuncioJSON = {};

        if (!nomeAnuncio) {
            return message.ERROR_INVALID_ID;
        } else {
            let dadosAnuncios = await filmeDAO.selectByNome(nome);

            if (dadosAnuncios) {
                if (dadosAnuncios.length > 0) {
                    anuncioJSON.anuncio = dadosAnuncios;
                    anuncioJSON.status_code = 200;
                    return anuncioJSON;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_DB;
    }
};

const getBuscarAnuncio = async function(id) {
    try {
        let idAnuncio = id;
        let anuncioJSON = {};

        if (!idAnuncio || isNaN(idAnuncio)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let dadosAnuncio = await filmeDAO.selectByIdAnuncio(idAnuncio);

            if (dadosAnuncio) {
                if (dadosAnuncio.length > 0) {
                    anuncioJSON.anuncio = dadosAnuncio;
                    anuncioJSON.status_code = 200;
                    return anuncioJSON;
                } else {
                    return message.ERROR_NOT_FOUND; // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_DB; // 500
    }
};

module.exports = {
    setInserirNovoAnuncio,
    getListarAnuncio,
    getBuscarAnuncioNome,
    getBuscarAnuncio
};
