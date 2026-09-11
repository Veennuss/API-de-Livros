// ============================================================
// ELEMENTOS DA PÁGINA
// ============================================================

const formLivro = document.querySelector('#formLivro');
const inputTitulo = document.querySelector('#inputTituto'); // Mantido com o ID do seu HTML
const botaoBuscar = document.querySelector('#botaoBuscar');
const mensagem = document.querySelector('#mensagem');
const listaResultados = document.querySelector('#listaResultado');
const resultado = document.querySelector('#resultado'); 
const estadoInicial = document.querySelector('#estadoInicial'); 

// Endereço do nosso BACKEND
const API = 'http://localhost:3000';

// ============================================================
// CONSULTA DE LIVROS
// ============================================================

formLivro.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita o recarregamento da página

  const tituloBuscado = inputTitulo.value.trim();

  if (!tituloBuscado) {
    mensagem.innerText = 'Por favor, digite o título de um livro.';
    return;
  }

  try {
    botaoBuscar.disabled = true;
    botaoBuscar.innerText = 'Buscando...';
    mensagem.innerText = 'Consultando nossa API...';

    // Limpa resultados anteriores da tela
    if (listaResultados) {
      listaResultados.innerHTML = '';
    }

    // O FRONTEND chama o nosso BACKEND passando o título digitado
    const resposta = await fetch(`\({API}/api/livros/pesquisa?titulo=\){encodeURIComponent(tituloBuscado)}`);

    // Transforma a resposta em JSON
    const dados = await resposta.json();

    // Se o backend retornar erro (400, 404, 500...)
    if (!resposta.ok) {
      mensagem.innerText = dados.mensagem || 'Não foi possível buscar os livros.';
      return;
    }

    // Pega a lista de livros (garantindo pegar no máximo os 5 primeiros)
    const livros = Array.isArray(dados) ? dados.slice(0, 5) : (dados.items ? dados.items.slice(0, 5) : []);

    if (livros.length === 0) {
      mensagem.innerText = 'Nenhum livro encontrado.';
      return;
    }

    // Percorre cada livro do array e cria os elementos HTML para exibir
    livros.forEach(livro => {
      const info = livro.volumeInfo || livro;

      const tituloLivro = info.title || 'Título não informado';
      const autorLivro = info.authors ? (Array.isArray(info.authors) ? info.authors.join(', ') : info.authors) : (info.autor || 'Autor não informado');
      const anoLivro = info.publishedDate ? info.publishedDate.substring(0, 4) : (info.ano || 'Ano não informado');

      const itemLivro = document.createElement('div');
      itemLivro.classList.add('livro-item');

      itemLivro.innerHTML = ``;

  if (listaResultados) {
    listaResultados.appendChild(itemLivro);
  }
});

mensagem.innerText = 'Consulta realizada com sucesso!';

if (resultado) resultado.classList.remove('oculto');
if (estadoInicial) estadoInicial.classList.add('oculto');
} catch (erro) {
console.error(erro);
mensagem.innerText = 'Não foi possível conectar ao backend.';
} finally {
botaoBuscar.disabled = false;
botaoBuscar.innerText = 'Buscar';
}
});