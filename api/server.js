const express = require('express');
const server = express();

server.use(express.json());

const carsRouter = require('./cars/carsRouter');

server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome to dream car api' })
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server;