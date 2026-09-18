require('dotenv').config();

const express = require('express');
const cors = require('cors')

const conectarBanco = require('./config/database');

const app =  express();


app.use(cors());
app.use(express.json());



// Importa as rotas responsáveis pelas consultas de busca.
const livroRoutes = require('./routes/livroRoutes');



app.use('/api/livros', livroRoutes);




const PORT = 3000;



async function iniciarServidor() {
 
  await conectarBanco();

app.listen(PORT, () => {
     console.log(`Servidor rodando em http://localhost:${PORT}/api/livros/pesquisa`);

});

}

iniciarServidor();