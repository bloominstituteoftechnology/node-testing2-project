const express = require('express')
const dogsRouter = require('./dogs/dogs-router')

const server = express()

server.use(express.json())
server.use('/api/dogs', dogsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })
server.get('/', (req, res) => {
    res.status(200).json({api: 'running'})
})
module.exports = server