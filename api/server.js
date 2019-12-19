const express = require('express');

const Festivals = require('../festivals/festivalsModel.js');

const server = express();

server.use(express.json());

module.exports = server;
