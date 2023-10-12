const express = require('express')
const genereRouter = require('../api/genere/router')
const videogameRouter = require('../api/videogames/router')

const server= express()

server.use(express.json())
server.use('/api/genere', genereRouter)
server.use('/api/videogames', videogameRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });
  
  module.exports = server;