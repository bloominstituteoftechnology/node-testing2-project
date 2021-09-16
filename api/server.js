const express = require('exress')
const cors = require('cors')

const server = express()

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')

server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack, 
    })
})

module.exports = server;