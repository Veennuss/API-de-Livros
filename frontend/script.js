// ============================================================
// ELEMENTOS DA PÁGINA
// ============================================================

// Formulário de pesquisa
const formPesquisa = document.getElementById("formPesquisa");

// Campo onde o usuário digita o título
const campoTitulo = document.getElementById("titulo");

// Área onde os resultados serão exibidos
const resultados = document.getElementById("resultados");

// Área das mensagens
const mensagem = document.getElementById("mensagem");

// Área de resultado, caso exista no HTML
const resultado = document.getElementById("resultado");

// Área do estado inicial, caso exista no HTML
const estadoInicial = document.getElementById("estadoInicial");

// Botão de pesquisa
const botaoBuscar = document.getElementById("botaoBuscar");

// Endereço do nosso BACKEND
const API = "http://localhost:3000";


// ============================================================
// PESQUISA DE LIVROS
// ============================================================

formPesquisa.addEventListener("submit", async function (evento) {

    // Impede a página de recarregar
    evento.preventDefault();

    // Pega o título digitado
    const titulo = campoTitulo.value.trim();


    // ========================================================
    // VERIFICA SE O CAMPO ESTÁ VAZIO
    // ========================================================

    if (titulo === "") {
        mensagem.textContent = "Digite o título de um livro.";
        resultados.innerHTML = "";
        return;
    }


    // ========================================================
    // PREPARA A PESQUISA
    // ========================================================

    mensagem.textContent = "🔄 Pesquisando livros...";
    resultados.innerHTML = "";

    // Desativa o botão durante a pesquisa
    if (botaoBuscar) {
        botaoBuscar.disabled = true;
        botaoBuscar.textContent = "Buscando...";
    }


    try {

        /*
         * O FRONTEND chama SOMENTE o nosso BACKEND.
         *
         * O BACKEND é responsável por consultar
         * a Open Library.
         */

        const resposta = await fetch(
            `${API}/api/livros/pesquisa?titulo=${encodeURIComponent(titulo)}`
        );


        // ====================================================
        // VERIFICA SE O BACKEND RETORNOU ERRO
        // ====================================================

        if (!resposta.ok) {

            if (resposta.status === 404) {
                mensagem.textContent = "📚 Nenhum livro encontrado.";
            } else {
                mensagem.textContent =
                    "⚠️ Ocorreu um erro na pesquisa.";
            }

            return;
        }


        // ====================================================
        // CONVERTE A RESPOSTA PARA JSON
        // ====================================================

        const dados = await resposta.json();


        // ====================================================
        // PEGA A LISTA DE LIVROS
        // ====================================================

        // Caso o backend retorne diretamente um array
        // ou retorne um objeto com a propriedade "items"

        const livros = Array.isArray(dados)
            ? dados.slice(0, 5)
            : dados.items
                ? dados.items.slice(0, 5)
                : [];


        // ====================================================
        // VERIFICA SE NÃO ENCONTROU LIVROS
        // ====================================================

        if (!livros || livros.length === 0) {
            mensagem.textContent = "📚 Nenhum livro encontrado.";
            return;
        }


        // Limpa a mensagem
        mensagem.textContent = "";


        // ====================================================
        // CRIA OS CARDS DOS LIVROS
        // ====================================================

        livros.forEach(function (livro) {

            /*
             * Se o backend retornar os dados dentro de
             * volumeInfo, usamos volumeInfo.
             *
             * Caso contrário, usamos o próprio livro.
             */

            const info = livro.volumeInfo || livro;


            // =================================================
            // TÍTULO
            // =================================================

            const tituloLivro =
                info.title ||
                info.titulo ||
                "Título não informado";


            // =================================================
            // AUTOR
            // =================================================

            let autorLivro = "Não informado";

            if (info.authors) {

                if (Array.isArray(info.authors)) {
                    autorLivro = info.authors.join(", ");
                } else {
                    autorLivro = info.authors;
                }

            } else if (info.autor) {
                autorLivro = info.autor;
            }


            // =================================================
            // ANO
            // =================================================

            let anoLivro = "Não informado";

            if (info.publishedDate) {

                anoLivro = info.publishedDate.substring(0, 4);

            } else if (info.ano) {

                anoLivro = info.ano;
            }


            // =================================================
            // CRIA O CARD
            // =================================================

            const card = document.createElement("article");
            card.classList.add("card-livro");


            // Cria a estrutura do card
            // Reservamos o mesmo espaço para livros sem capa

            card.innerHTML = `
                <div class="capa-livro ${livro.capa ? "" : "sem-capa"}">

                    ${
                        livro.capa
                            ? `<img src="${livro.capa}" alt="Capa de ${tituloLivro}">`
                            : `<span>Sem capa</span>`
                    }

                </div>

                <h3>${tituloLivro}</h3>

                <p>
                    <strong>Autor:</strong>
                    ${autorLivro}
                </p>

                <p>
                    <strong>Ano:</strong>
                    ${anoLivro}
                </p>
            `;


            // Coloca o card na tela
            resultados.appendChild(card);
        });


        // ====================================================
        // MOSTRA A ÁREA DE RESULTADOS
        // ====================================================

        if (resultado) {
            resultado.classList.remove("oculto");
        }

        if (estadoInicial) {
            estadoInicial.classList.add("oculto");
        }


        mensagem.textContent =
            `📚 ${livros.length} livro(s) encontrado(s).`;


    } catch (erro) {

        // ====================================================
        // ERRO DE CONEXÃO
        // ====================================================

        console.error(erro);

        mensagem.textContent =
            "⚠️ Não foi possível conectar ao servidor.";
    }


    // ========================================================
    // LIBERA O BOTÃO NOVAMENTE
    // ========================================================

    finally {

        if (botaoBuscar) {
            botaoBuscar.disabled = false;
            botaoBuscar.textContent = "Buscar";
        }
    }
});