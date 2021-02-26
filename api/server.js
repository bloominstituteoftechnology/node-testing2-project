const express = require('express')
const Pokemon = require('./pokemon/pokemon-model')
const server = express()

server.use(express.json())

server.post('/pokemon', (req, res) =>{
    Pokemon.insert(req.body)
    .then((pokemon) =>{
        res.status(201).json(pokemon)
    })
    .catch((error) =>{
        res.status(400).json({message: 'Failed to add pokemon'})
    })
})

server.delete('/pokemon/:id', (req, res) =>{
    const { id } = req.params;

  Pokemon.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find pokemon with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete pokemon' });
    });
})

module.exports = server
