const express = require("express");

const server = express();

server.use(express.json());

const Coasters = require("./model");

server.get("/api/coasters/:id", async (req, res) => {
    const coaster = await Coasters.getBy({ coaster_id: req.params.id });
    res.json(coaster);
})

server.get("/api/coasters", (req, res) => {
    Coasters.get()
        .then( coasters => res.json(coasters));
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