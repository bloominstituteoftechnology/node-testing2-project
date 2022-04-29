const express = require('express');
const studentsRouter = require('./students/students-router');

const server = express();

server.use(express.json())

server.use('/api/students', studentsRouter);

server.use('*', (req, res) => {
    res.json({api: "up"})
})
module.exports = server;