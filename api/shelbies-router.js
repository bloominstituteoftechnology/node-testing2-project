const express = require('express');
const db = require('../data/config');
const Shelby = require('./shelbies-model');
const { checkForValidID } = require('../middleware/shelbies');
const router = express.Router();

// Family Meeting - get all the shelbies
router.get('/', async (req, res, next) => {
	try {
		const shelbies = await Shelby.find();
		res.json(shelbies);
	} catch (err) {
		next(err);
	}
});

// Get Shelby by ID
router.get('/:id', checkForValidID, async (req, res, next) => {
	try {
		const shelby = await Shelby.findById(req.params.id);
		res.json(shelby);
	} catch (err) {
		next(err);
	}
});

// Create a shelby
router.post('/', async (req, res, next) => {
	try {
		const shelby = await Shelby.create(req.body);
		res.status(201).json(shelby);
	} catch (err) {
		next(err);
	}
});

//Delete A Shelby from the Family
router.delete('/:id', checkForValidID, async (req, res, next) => {
	try {
		await Shelby.nuke(req.params.id);
		res.json({
			message: 'In the bleak--'
		});
	} catch (err) {
		next(err);
	}
});
module.exports = router;
