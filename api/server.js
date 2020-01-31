const express = require("express");
const helmet = require('helmet');

const cors = require('cors');


// routers
const authRouter = require('../auth/auth-router.js');
const houseRouter = require('../house/house-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/house', houseRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: "It's alive!"})
})

module.exports = server;