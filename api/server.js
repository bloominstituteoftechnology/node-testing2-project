const express = require('express');
const helmet = require('helmet');
const Friends = require('./friends/friends-model');

const server = express();

server.use(express.json());
server.use(helmet());

//eslint-disable-next-line
server.get('/', (req, res, next) => {
	res.status(200).json({ api: 'up' });
});

server.get('/friends', async (req, res, next) => {
	try {
		const friends = await Friends.getAll();
		res.status(200).json(friends);
	} catch (err) {
		next(err);
	}
});

//eslint-disable-next-line
server.use((err, req, res, next) => {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
});
module.exports = server;
