const express = require('express')

const DwarfRouter = require('./api/dwarf-router')

const server = express()

server.use(express.json())

server.use("/api/dwarf", DwarfRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" })
})

module.exports = server
