const express = require("express")
const helmet = require("helmet")
const jokesRouter = require("./jokes/jokes_router")



const server = express()

server.use(helmet())
server.use(express.json())
server.use(jokesRouter)


server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({error: "Something went terribly wrong"})
})

module.exports = server