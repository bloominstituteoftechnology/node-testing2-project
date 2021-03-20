const express = require('express');
const cors = require('cors');
const shelbiesRouter = require('./api/shelbies-router');
const server = express();

server.use(cors());
server.use(express.json());

server.use('/shelbies', shelbiesRouter);

server.get('/', (req, res) => {
	res.json({
		message: 'Welcome to Shelby Limited LLC.'
	});
});

server.use((err, res, req, next) => {
	console.log(err);
	res.status(500).json({
		message: 'Something went wrong!'
	});
});

module.exports = server;
