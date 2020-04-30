const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const itemsRouter = require('./items/items-router.js');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/items', itemsRouter);

server.get('/', (req, res) => {
  res.status(200).json("Hello from the server!");
});

module.exports = server;
