const express = require('express')
const flowersRouter = require('./flowers/flowers-router')

const server = express()
server.use(express.json())
server.use('/api/flowers', flowersRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message
    })
  })

module.exports = server;