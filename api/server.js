const express = require('express');

const Capitals = require('./capitals/capitals-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

server.get('/capitals', (req, res) => {
    Capitals.getAll()
        .then(capitals => {
            res.status(200).json(capitals)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

server.get('/capitals/:id', (req, res, next) => {
    Capitals.getById(req.params.id)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})

server.post('/capitals', async (req, res) => {
    console.log(req.body.city)
   res.status(201).json(await Capitals.addCapital(req.body))
})




module.exports = server;