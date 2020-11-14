const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/reprograma"

const connect = () => {
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(url, { useNewUrlParser: true })
  const connection = mongoose.connection
  connection.on('error', () => console.error('Erro de conexão com mongo'))
  connection.once('open', () => console.log('Conexão realizada com sucesso!'))
}

module.exports = { connect }