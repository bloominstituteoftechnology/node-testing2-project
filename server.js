const express = require('express');
const server = express();
const stoicRouter = require('./api/stoicRouter.js');

server.use(express.json());
server.use('/api/stoics', stoicRouter);

module.exports = server;
