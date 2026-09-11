
const tituloLivro = 'Harry Potter';

async function pesquisarLivro(titulo) {
    const tituloFormatado = encodeURIComponent(titulo);

    const url =
        `https://openlibrary.org/search.json?title=${tituloFormatado}&limit=1`;

    try {
        console.log('\nPesquisando...');

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error('Erro ao consultar a Open Library');
        }

        const dados = await resposta.json();

        if (dados.docs.length === 0) {
            console.log('Nenhum livro encontrado.');
            return;
        }

        // Pega o primeiro objeto do array
        const livro = dados.docs[0];

        console.log('\nLivro encontrado');
        console.log(`Título: ${livro.title}`);
        console.log(
            `Autor: ${livro.author_name?.[0] || 'Não informado'}`
        );
        console.log(
            `Ano: ${livro.first_publish_year || 'Não informado'}`
        );
        console.log(`Chave: ${livro.key}`);

    } catch (erro) {
        console.log('Erro:', erro.message);
    }
}

pesquisarLivro(tituloLivro);

