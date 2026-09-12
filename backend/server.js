
const express = require('express');
const cors = require('cors')

const app =  express();


app.use(cors());
app.use(express.json());



// Importa as rotas responsáveis pelas consultas de busca.
const livroRoutes = require('./routes/livroRoutes');



app.use('/api/livros', livroRoutes);




const PORT = 3000;


app.listen(PORT, () => {
     console.log(`Servidor rodando em http://localhost:${PORT}`);

});

