const express = require('express');

const Friends = require('./friends/friends-model');

const server = express();

server.use(express.json());

server.get('/', (req, res, next) => {
	res.status(200).json({ api: 'up' });
});

module.exports = server;
