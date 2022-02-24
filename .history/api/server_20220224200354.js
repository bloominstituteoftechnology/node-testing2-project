const express = require('express');
const helmet = require('helmet');


server.get('/', (req, res) => {
	res.json({ api: 'up' });
});

server.use((error, req, res, next) => {
	// eslint-disable-line
	res.status(error.status || 500).json({
		message: error.message,
		stack: error.stack,
	});
});

module.exports = server;