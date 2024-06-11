const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para inserir um anúncio no BD
const insertAnuncio = async function (dadosAnuncio) {
    try {
        const novoAnuncio = await prisma.anuncio.create({
            data: {
                nome: dadosAnuncio.nome,
                endereco: dadosAnuncio.endereco,
                descricao: dadosAnuncio.descricao,
                valor: dadosAnuncio.valor,
                foto: dadosAnuncio.foto
            }
        });
        
        // Verifica se o anúncio foi inserido com sucesso
        return novoAnuncio ? true : false;
    } catch (error) {
        console.error("Erro ao inserir anúncio:", error);
        return false;
    }
}

// Função para atualizar um anúncio no BD
const updateAnuncio = async function (id, novosDados) {
    try {
        const anuncioAtualizado = await prisma.anuncio.update({
            where: { id: id },
            data: novosDados
        });
        
        // Retorna os dados atualizados do anúncio
        return anuncioAtualizado;
    } catch (error) {
        console.error("Erro ao atualizar anúncio:", error);
        return null;
    }
}

// Função para excluir um anúncio do BD
const deleteAnuncio = async function (id) {
    try {
        await prisma.anuncio.delete({ where: { id: id } });
        return true;
    } catch (error) {
        console.error("Erro ao excluir anúncio:", error);
        return false;
    }
}

// Função para listar todos os anúncios do BD
const selectAllAnuncio = async function () {
    try {
        return await prisma.anuncio.findMany();
    } catch (error) {
        console.error("Erro ao listar anúncios:", error);
        return null;
    }
}

// Função para buscar um anúncio pelo nome
const selectAnuncioByNome = async function (nome) {
    try {
        return await prisma.anuncio.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        });
    } catch (error) {
        console.error("Erro ao buscar anúncio por nome:", error);
        return null;
    }
}

// Função para buscar um anúncio pelo ID
const selectAnuncioById = async function (id) {
    try {
        return await prisma.anuncio.findUnique({ where: { id: id } });
    } catch (error) {
        console.error("Erro ao buscar anúncio por ID:", error);
        return null;
    }
}

module.exports = {
    insertAnuncio,
    updateAnuncio,
    deleteAnuncio,
    selectAllAnuncio,
    selectAnuncioByNome,
    selectAnuncioById
}
