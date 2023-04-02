const express = require("express");

const server = express();

server.use(express.json());

server.get("/api/coasters", (req, res) => {
    res.json({ message: "This would be all the coasters"});
})

server.get("/api/coasters/:id", (req, res) => {
    res.json({ message: `This would be all the coaster with id ${req.params.id}` });
})

server.get("/api/coasters/:abbrv", (req, res) => {
    res.json({ message: `This would be all the coaster abbreviated as ${req.params.abbrv}` })
})

server.post("/api/coasters/", (req, res) => {
    res.status(201).json(req.body);
})

server.use("*", (req, res) => {
    res.status(404).json({ message: "There's nothing here!"});
})

module.exports = server;