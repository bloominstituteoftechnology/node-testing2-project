const router = require('express').Router();
const db = require('../database/dbConfig');
const Resources = require('../api/resources-modal');

router.post('/create', (req, res) => {
	let resource = req.body;
	Resources.add(resource)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});
router.get('/resources', (req, res) => {
	Resources.find()
		.then(resources => {
			res.json(resources);
		})
		.catch(err => res.send(err));
});
router.delete('/resources/:id', (req, res) => {
	id = req.params.id;
	Resources.destroy({ id })
		.then(resource => {
			res.json(resource);
		})
		.catch(err => res.send(err));
});

module.exports = router;
