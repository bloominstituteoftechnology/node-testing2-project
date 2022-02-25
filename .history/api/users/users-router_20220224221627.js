const router = require('express').Router();

const User = require('./users-model');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.delete('')
module.exports = router;
