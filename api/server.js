const express = require("express");
const server = express();
const Cars = require('./cars/cars-model')

server.get('/cars', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

server.get('/cars/id', async (req, res) => {
    res.status(200).json(req.car)
})

server.post('/cars', async (req, res) => {
    const inserted = await Cars.create(req.body)
    res.status(201).json({ ...inserted })
})

module.exports = server
