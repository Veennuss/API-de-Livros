const { pesquisarLivros } = require("../services/livroService");


async function pesquisarLivroRotas(req, res) {

    const titulo = req.query.titulo?.trim();


    if (!titulo) {

        return res.status(400).json({
            erro: "O título nao informado"
        });

    }


    try {

        const livros = await pesquisarLivros(titulo);


        if (livros.length === 0) {

            return res.status(404).json({
                erro: "Livro não encontrado"
            });

        }


        return res.status(200).json(livros);


    } catch (erro) {

        console.log("Erro no controller:", erro.message);


        return res.status(500).json({
            erro: "Erro interno ou falha ao consultar a API"
        });

    }

}


module.exports = {
    pesquisarLivroRotas
};