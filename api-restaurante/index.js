const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
require('dotenv').config()

const app  = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use('/produtos', require('./src/routes/produtos'))
app.use('/pedidos',  require('./src/routes/pedidos'))

// Rota raiz — para testar se a API está no ar
app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Restaurante funcionando!' })
})

// Conexão com o MongoDB e inicialização do servidor
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB!')
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err)
  })
