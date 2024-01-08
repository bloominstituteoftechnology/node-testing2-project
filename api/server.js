const express = require('express');
const Pets = require('./pets/pets-model')
const server = express();

server.use(express.json())

server.get('/', async (req,res) => {
    res.status(200).json({api: 'up'})
})

server.get('/pets', (req,res) => {
    Pets.getAll()
    .then(pets => {
        res.status(200).json(pets)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.get('/pets/:id', async (req,res) => {
    const pet = await Pets.getById(req.params.id)
    if(!pet){
        res.status(404).end()
    } else {
        res.json(pet)
    }
})

server.post('/pets', async (req,res) => {
    const newPet = await Pets.insert(req.body)
    res.json(newPet)
})

server.delete('/pets/:id', async (req,res) => {
    await Pets.remove(req.params.id)
    res.status(200).json({message: `pet with id ${req.params.id} removed from database`})
})

module.exports = server;