const express = require('express');
// import routers
const TokenRouter = require('./tokens/token-router.js');
const server = express();

server.use(express.json());

// instantiate routers with server.use and path
server.use('/api/tokens', TokenRouter);

server.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome To My ETH Token API "
    });
})


module.exports = server;