const express = require('express')
const server = express()
const userRouter = require('./users/userRouter')

//Routes


server.use('/api/users', userRouter)

server.use((error,req,res,next)=>{
    res.status(error.status || 500).json({message: error.message || 'Server error'})
})


module.exports = server
