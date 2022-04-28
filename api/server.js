const express = require('express')
const req = require('express/lib/request')

const model = require('./model')

const server = express()

server.use(express.json())

server.get("/", (req,res) => {
    res.status(200).json({ api: "up and running señor"})
})

server.get('/crossfitters', (req,res) => {
    res.json('you found me')
})

server.get('/crossfitters/:id', (req,res) => {
    res.json('you found me again!')
})

server.post('/crossfitters', (req,res) => {
    res.json('you are getting good at this')
})

server.delete('/crossfitters/:id', (req,res) => {
    res.json('you mastered it')
})

module.exports = server