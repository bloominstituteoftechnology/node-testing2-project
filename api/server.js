const express = require('express');

// Model goes here
const Dogs = require('../dogs/dogsModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: "Up" });
});

server.get('/dogs', (req, res) => {
    Dogs.find()
        .then(dogs => res.status(200).json(dogs))
        .catch(err => res.status(500).json({ message: err }))
});

server.get('/:id', (req, res) => {
    const { id } = req.params;
    Dogs.findById(id)
        .then(dog => {
            if (dog) res.status(200).json(dog)
            else res.status(404).json({ message: 'No such dog' })
        })
        .catch(err => res.status(500).json({ message: err }))
});

server.post('/', (req, res) => {
    const dogData = req.body;
    Dogs.insert(dogData)
        .then(dog => res.status(201).json(dog))
        .catch(err => res.status(500).json({ message: err }))
});

server.delete('/:id', (req, res) => {
    const { id } = req.params;
    Dogs.remove(id)
        .then(dog => {
            if (dog) res.json({ removed: dog })
            else res.status(404).json({ message: 'No such dog' })
        })
        .catch(err => res.status(500).json({ message: err }))
});

module.exports = server;