const express = require('express');
const BabyNameRouter = require('./router');

const server = express();

server.use(express.json());
server.use('/api/babynames', BabyNameRouter);



server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;