const express = require('express');

// Model goes here

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: "Up" });
});

module.exports = server;