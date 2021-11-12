const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json('hello from api')
})
server.get('/starks', (req, res, next) => {

})
server.get('/starks', (req, res, next) => {

})
server.get('/starks', (req, res, next) => {

})
server.get('/starks', (req, res, next) => {

})
server.get('/starks', (req, res, next) => {

})
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = server
