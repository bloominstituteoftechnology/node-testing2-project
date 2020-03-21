const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const router = require('../auth/auth-router');

server.use('/api', router);
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/api/auth', router);
server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });

module.exports = server; 