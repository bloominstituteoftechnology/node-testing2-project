const express = require('express')
const router = express.Router()
const Quotes = require('./quotesModel')

router.post('/', async (req, res) => {

    const newQuote = await Quotes.insert(req.body)
    res.status(201).json(newQuote)
})

router.delete("/:id", async (req, res) => {

    const id = req.params.id
    const delQuote = await Quotes.remove(id)
    res.status(200).json(delQuote)
})

module.exports = router