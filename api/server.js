const express = require('express');
const pokemonsRouter = require('./pokemonsRouter');

const server = express();

server.use(express.json());

server.use('/api/pokemons', pokemonsRouter);

server.use('*', (req, res, next) => {
    next({ status: 404, message: 'Not found!' })
  })
  
  server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = server;