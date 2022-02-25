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

server.get('/api/users', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

function validateUser(req, res, next) {
	if (!req.body.username || !req.body.password || !req.body.password.trim() || !req.body.user.trim()) {
		res.status(422).end()
	} else {
		next()
	}
}
router.post('/register', validateUser, (req, res, next) => {
		const { username, password } = req.body;

		User.add({ username, password })
			.then((savedUser) => {
				res.status(201).json(savedUser);
			})
			.catch(next);
	}
);

server.use((error, req, res, next) => {
	// eslint-disable-line
	res.status(error.status || 500).json({
		message: error.message,
		stack: error.stack,
	});
});

module.exports = server;
