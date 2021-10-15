const express = require('express')
const server = express()

const quotesRouter = require("./quotes/quotesRouter.js");



server.use(express.json())
server.use("/quotes", quotesRouter)


module.exports = server