const express = require('express')
const server = express()
const showsRouter = require('./api/showsRouter')

server.use(express.json())
server.use('/shows', showsRouter)

module.exports = server