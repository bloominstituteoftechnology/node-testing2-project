const express = require("express");
const server = express();
const Cars = require('./cars/cars-model')

server.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

server.get('/:id', async (req, res) => {
    res.status(200).json(req.car)
})

server.post('/', async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body)
        res.json(newCar)
    } catch (err) {
        next(err)
    }
})

module.exports = server
