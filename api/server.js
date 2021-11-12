const express = require('express')
const Starks = require('./starks/starks-model')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json('hello from api')
})

server.get('/starks', (req, res, next) => {
  Starks.getAll()
    .then(starks => {
      res.status(200).json(starks)
    })
    .catch(next)
})

server.get('/starks/:id', async (req, res) => {
  res.json(await Starks.getById(req.params.id))
})

server.post('/starks', (req, res, next) => {

})

server.delete('/starks', (req, res, next) => {

})

server.put('/starks', (req, res, next) => {

})

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = server
