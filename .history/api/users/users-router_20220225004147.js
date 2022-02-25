const router = require('express').Router();

const User = require('./users-model');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

function validateUser(req, res, next) {
	if (!req.body.username || !req.body.password || !req.body.password.trim())
}
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
	if (req.user.password) {
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
