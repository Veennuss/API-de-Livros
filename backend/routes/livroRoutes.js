// ============================================================
// ROTAS DE LIVRO
// ============================================================

const express = require('express');

// Router permite separar as rotas do arquivo principal server.js.
const router = express.Router();



//pega a funcao pesquisar livro para passar como parametro para a rota "/pesquisa"
const { pesquisarLivroRotas } = require('../controllers/livroController');


router.get("/pesquisa", pesquisarLivroRotas);



module.exports = router;
