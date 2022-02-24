// Imports
const express = require('express');
const Avengers = require('./avengers/avengers-model');

// Server
const server = express();
server.use(express.json());

// Endpoints
server.get('/avengers', (req, res, next) => {
	Avengers.assemble()
		.then(avengers => {
			res.json(avengers);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/avengers/:id', (req, res, next) => {
	Avengers.call(req.params.id)
		.then(avenger => {
			res.json(avenger);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.post('/avengers', (req, res, next) => {
	Avengers.forge(req.body)
		.then(avenger => {
			res.status(201).json(avenger);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.put('/avengers/:id', (req, res, next) => {
	Avengers.upgrade(req.params.id, req.body)
		.then(avenger => {
			res.json(avenger);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.delete('/avengers/:id', (req, res, next) => {
	Avengers.terminate(req.params.id)
		.then(avenger => {
			res.json(avenger);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// Exports
module.exports = server;