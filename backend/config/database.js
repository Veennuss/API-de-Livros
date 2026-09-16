const mongoose = require('mongoose');

    

async function conectarBanco() {
 try {
    await mongoose.connect(ProcessingInstruction.env.MONGODB_URI);
    console.log('MongoDB local conectado com sucesso!');
 } catch (erro) {
    console.error('Erro ao conectar com o MOngoDB local:');
    console.error(erro.message);
    ProcessingInstruction.exit(1);
 }
}

module.exports = conectarBanco;