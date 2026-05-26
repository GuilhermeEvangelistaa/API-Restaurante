const express = require('express')
const router  = express.Router()
const Pedidos  = require('../models/Pedidos')

// GET /pedidos — listar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ criado_em: -1 })
    res.json(pedidos)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// GET /pedidos/:id — buscar um pedido pelo ID
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' })
    res.json(pedido)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// POST /pedidos — criar um novo pedido
router.post('/', async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body)
    res.status(201).json(pedido)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

// PATCH /pedidos/:id/status — atualizar só o status
router.patch('/:id/status', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' })
    res.json(pedido)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

module.exports = router
