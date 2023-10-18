const express = require("express");
const morgan = require("morgan")
const UserRouter = require("./users/users.router");

const server = express();


server.use(express.json())
server.use(morgan("dev"))

server.use("/api/users",UserRouter)

server.get("/",async(req,res,next)=> {
    try {
    res.status(200).json({message : "sanity confirmed"})
    } catch (err) {next(err)}
})

server.use("*",(req,res,next)=> {
    next({status : 404, message : "page not found"})
})

server.use((error,req,res,next)=>{ //eslint-disable-line
    res.status(error.status || 500).json({
        message : error.message,
        stack : error.stack
    })
})

module.exports = server;