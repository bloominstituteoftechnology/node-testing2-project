const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/users-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send({api: 'up'});
})

module.exports = server;