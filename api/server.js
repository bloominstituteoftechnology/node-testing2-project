const express = require('express')
const streamerRouter = require('./streamers/streamer-router')
const server = express()

server.use(express.json())

server.use('/api/streamers', streamerRouter)

server.use ('*', (req, res)=> {
    res.json({api: 'up'})
});

server.use((err, req, res, next) => { // eslint-disable-line
    // DO YOUR MAGIC
   res.status(err.status || 500).json({
     message: err.message
   })
  })

module.exports = server