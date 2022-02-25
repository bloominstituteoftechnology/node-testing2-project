const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/users', usersRouter);

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
