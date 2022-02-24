const express = require('express');
const helmet = require('helmet');
const knex = require('../data/db-config');


server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
	res.json({ API: 'UP & RUNNING' });
});

server.use((error, req, res, next) => {
	// eslint-disable-line
	res.status(error.status || 500).json({
		message: error.message,
		stack: error.stack,
	});
});

module.exports = server;
