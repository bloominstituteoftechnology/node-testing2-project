const router = require('express').Router();

const { restricted } = require('../auth/auth-middleware');
const User = require('./users-model');

router.get('/', restricted, async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.post('/register', (req, res, next) => {
		const { username, password } = req.body;

		User.add({ username, password })
			.then((savedUser) => {
				res.status(201).json(savedUser);
			})
			.catch(next);
	}
);

router.post('/login', (req, res, next) => {
	const { password } = req.body;
	if (req.user.password)) {
		// set cookie on the client
		// server stores session with session ID
		req.session.user = req.user;
		res.json({ message: `Welcome ${req.user.username}` });
	} else {
		next({ status: 401, message: 'Invalid credentials' });
	}
});

router.get('/logout', (req, res) => {
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

module.exports = router;
