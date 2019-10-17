const express = require('express');
const helmet = require('helmet');

const communityRouter = require('./community/community-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/', communityRouter);

server.get('/', (req, res) => {
  res.send("Server working");
});

module.exports = server;