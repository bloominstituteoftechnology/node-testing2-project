const express = require('express')
const server = express()
const Model = require('./pokemon/pokemonModel')

server.use(express.json())

server.get('/', (req, res) => {
    console.log('getting all pokemon')
    Model.getAll()
        .then(pokemon => {
            res.status(200).json(pokemon)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

server.get('/:id', (req, res) => {
    console.log('getting by id')
    const { id } = req.params
    Model.getById(id)
        .then(pokemon => {
            res.status(200).json(pokemon)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

server.post('/', (req, res) => {
    console.log('creating pokemon')
    Model.create(req.body)
        .then(newPokemon => {
            console.log(newPokemon)
            res.status(201).json(newPokemon)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.delete('/:id', (req, res) => {
    console.log('deleting a pokemon')
    const { id } = req.params
    let deletedPokemon;
    Model.getById(id)
        .then(response => {
            deletedPokemon = response
        })
    Model.remove(id)
        .then(deleted => {
            res.status(200).json(deletedPokemon)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})


module.exports = server