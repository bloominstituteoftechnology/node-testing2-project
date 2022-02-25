const express = require('express');
const helmet = require('helmet');
const User = require('./users/users-model');

const server = express();

server.use(helmet());
server.use(express.json());

// server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	res.status(200).json({ API: 'UP & RUNNING' });
});

server.get('/users', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

function validateUser(req, res, next) {
	if (
		!req.body.user ||
		!req.body.userName.trim()
	) {
		res.status(422).end();
	} else {
		next();
	}
}
server.post('/users', validateUser, async (req, res, next) => {
	res.status(201).json(await User.add(req.body))
});


server.use((error, req, res, next) => {
	// eslint-disable-line
	res.status(error.status || 500).json({
		message: error.message,
		stack: error.stack,
	});
});

module.exports = server;
