const express = require('express');

const Cars = require('../cars/carsModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'VROOM' });
});

server.get('/cars', (req, res) => {
    Cars.find()
        .then(cars => res.status(200).json(cars))
        .catch(err => res.status(500).json({ message: err }))
});

server.get('/id', (req, res) => {
    const { id } = req.params;
    Cars.findById(id)
        .then(cars => {
            if (dog) res.status(200).json(dog)
            else res.status(404).json({ message: 'No cars available' })
        })
        .catch(err => res.status(500).json({ message: err }))
})

server.post('/', (req, res) => {
    const carData = reeq.body;
    Cars.insert(carData)
        .then(car => res.status(201).json(car))
        .catch(err => res.status(500).json({ message: err }))
});

server.delete('/', (req, res) => {
    const { id } = req.params;
    Cars.remove(id)
        .then(dog => {
            if (dog) res.json({ removed: dog })
            else res.status(404).json({ message: 'No Car Found' })
        })
        .catch(err => res.status(500).json({ message: err }))
});

module.exports = server;