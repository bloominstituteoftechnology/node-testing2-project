const express = require('express')
const req = require('express/lib/request')

const model = require('./model')

const server = express()

server.use(express.json())

server.get("/", (req,res) => {
    res.status(200).json({ api: "up and running señor"})
})

module.exports = server