const express = require('express')
const cors = require('cors')
const vampiresRouter = require('./vampires/vampireRouter')

const server = express()

server.use(cors())
server.use(express.json())

server.use('/vampires', vampiresRouter)

server.get("/", (req,res) => {
    res.json({
        message: "Vampire API",
    })
})


server.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({
        message: "Something Went Wrong!"
    })
})

module.exports = server

