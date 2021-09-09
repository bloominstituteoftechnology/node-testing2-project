const express = require('express')
const resourceRouter = require('./resources/resource_router')


const server = express()

server.use(express.json())
server.use('/api/resources', resourceRouter)
server.use((err, req, res, next) => {
   res.status(500).json({
      message: err.message,
      stack: err.stack
   })
})

module.exports = server
