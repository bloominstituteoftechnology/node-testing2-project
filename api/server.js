const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const ipRouter = require('./ipholder/ipholder-router');

const server = express();
server.use(helmet() );
server.use(express.json() );
server.use(cors() );

server.get("/", (req,res) => {
    res.json({message: "Yip, yip, Appa!"});
})

server.use("/api/ipholder", ipRouter);

server.use('*', (req, res) => {
    res.status(404).json({ message: "No such endpoint" })
})

server.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ 
        message: "Server error detected.",
        err: err.message
});

    if (1 === 0) next();
})

module.exports = server;