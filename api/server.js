const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mementoRouter = require('./route/memento-route');

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/mori', mementoRouter)


server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server