const express = require('express');

const Snack = require('./snacks/snacks-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up'});
})

server.get('/api/snacks', (req, res, next) => {
    res.json('snacks get linked');
})

server.get('/api/snacks/:id', (req, res, next) => {
    res.json(' snack getById linked');
})

server.post('/api/snacks', (req, res, next) => {
    res.json('snack post linked');
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = server;