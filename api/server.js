const express = require('express')
const serverRouter = require('./recipes/recipes-router')

const server = express()

server.use(express.json())

server.use('/recipes', serverRouter)

module.exports = server