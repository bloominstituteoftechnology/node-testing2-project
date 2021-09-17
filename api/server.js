const express = require('express')
const Waxed = require('./waxed-products/waxed-products-model')

const server = express()

server.use(express.json())

server.post('/waxed-products', async (req, res) => {
    if (!req.body.name) {
        return res.status(404).end()
    }
    const newProduct = await Waxed.insert(req.body)
    res.status(201).json(newProduct)
})

server.delete('/waxed-products', async (req, res) => {
    try {
        const id = await Waxed.remove(req.body.id)
        res.status(200).json(id)
    } catch (err) {
        res.status(500).end
    }
})

module.exports = server