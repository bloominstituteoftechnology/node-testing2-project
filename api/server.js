const express = require("express");
const userRouter = require("./users/users-router")
const server = express();

server.use(express.json());
server.use("/api/user", userRouter)

server.use("/", (req, res)=>{
    res.status(200).json("Hello!")
})

module.exports = server;