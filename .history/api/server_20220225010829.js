const express = require('express');
const helmet = require('helmet');
const User = require('./');

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
	if (
		!req.body.username ||
		!req.body.password ||
		!req.body.password.trim() ||
		!req.body.user.trim()
	) {
		res.status(422).end();
	} else {
		next();
	}
}
server.post('/api/register', validateUser, (req, res, next) => {
	const { username, password } = req.body;

	User.add({ username, password })
		.then((savedUser) => {
			res.status(201).json(savedUser);
		})
		.catch(next);
});

server.post('/login', (req, res, next) => {
	const { password } = req.body;
	if (req.user.password) {
		req.session.user = req.user;
		res.json({ message: `Welcome ${req.user.username}` });
	} else {
		next({ status: 401, message: 'Invalid credentials' });
	}
});

server.get('/logout', (req, res) => {
	if (req.session.user) {
		req.session.destroy((error) => {
			if (error) {
				next(error);
			} else {
				res.json({ message: 'logged out' });
			}
		});
	} else {
		res.json({ message: 'no session' });
	}
});

server.use((error, req, res, next) => {
	// eslint-disable-line
	res.status(error.status || 500).json({
		message: error.message,
		stack: error.stack,
	});
});

module.exports = server;
