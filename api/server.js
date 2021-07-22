const express = require('express')

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  })

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
})

module.exports = server