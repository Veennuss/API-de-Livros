// ============================================================
// SERVICE DE LIVROS
// ============================================================

async function pesquisarLivros(titulo) {

    const tituloFormatado = encodeURIComponent(titulo);

    const url =
        `https://openlibrary.org/search.json?title=${tituloFormatado}&limit=5`;

    try {

        console.log('\nPesquisando...');

        const resposta = await fetch(url);


        if (!resposta.ok) {

            throw new Error('Erro ao consultar a Open Library');

        }


        const dados = await resposta.json();


        if (dados.docs.length === 0) {
            return [];

        }


        const livros = dados.docs.map((livro) => {

            return {

                titulo: livro.title,

                autor:
                    livro.author_name?.[0]
                    || 'Não informado',

                ano:
                    livro.first_publish_year
                    || 'Não informado',
                    capa:  livro.cover_i
                    ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
    : null

            };

        });


        return livros;


    } catch (erro) {

        console.log('Erro:', erro.message);

        throw erro;

    }

}


module.exports = {
    pesquisarLivros
};