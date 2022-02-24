const express = require('express');
const server = express();
const helmet = require('helmet')
const morgan = require('morgan');
const profileRouter = require('./profile/profile-router')

// Configure server here
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

server.use('/api/profile', profileRouter)

server.use((err, req, res, next) => { // eslint-disable-line

    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

server.use('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
})

module.exports = server;