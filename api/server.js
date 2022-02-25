const express = require('express');

const Snack = require('./snacks/snacks-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up'});
})

server.get('/snacks', (req, res, next) => {
    Snack.getAll()
    .then(snacks => {
        res.status(200).json(snacks);
    }) 
    .catch(next)
})

server.get('/snacks/:id', (req, res, next) => {
    Snack.getById(req.params.id)
    .then(snack => {
        res.status(200).json(snack);
    })
    .catch(next)
})

server.post('/snacks', (req, res, next) => {
    Snack.insert(req.body)
    .then(snack => {
        res.status(200).json(snack);
    })
    .catch(next)
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = server;