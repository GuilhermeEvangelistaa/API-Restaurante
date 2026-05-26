const express = require('express')
const router  = express.Router()
const Produtos = require('../models/Produtos') // Importado como Produtos

// GET /produtos — listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const listaProdutos = await Produtos.find() // Usa o modelo Produtos
    res.json(listaProdutos)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// GET /produtos/:id — buscar um produto pelo ID
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produtos.findById(req.params.id) // Usa o modelo Produtos
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' })
    res.json(produto)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// POST /produtos — criar um novo produto
router.post('/', async (req, res) => {
  try {
    const novoProduto = await Produtos.create(req.body) // Usa o modelo Produtos
    res.status(201).json(novoProduto)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

// PATCH /produtos/:id — atualizar um produto
router.patch('/:id', async (req, res) => {
  try {
    const produtoAtualizado = await Produtos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ) // Usa o modelo Produtos
    if (!produtoAtualizado) return res.status(404).json({ erro: 'Produto não encontrado' })
    res.json(produtoAtualizado)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

// DELETE /produtos/:id — remover um produto
router.delete('/:id', async (req, res) => {
  try {
    const produtoExcluido = await Produtos.findByIdAndDelete(req.params.id) // Usa o modelo Produtos
    if (!produtoExcluido) return res.status(404).json({ erro: 'Produto não encontrado' })
    res.json({ mensagem: 'Produto removido com sucesso' })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

module.exports = router