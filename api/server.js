const express = require('express');

const server = express();

const studentsRouter = require('./students-router');

server.use(express.json());

server.use('/api/students', studentsRouter);

server.get('/', (req, res) => {
    res.json({ message: 'up' });
    console.log('api is up');
});

server.use('*', (req, res, next) => {
    next({status: 404, message: 'Something went wrong with the Route '});
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;
