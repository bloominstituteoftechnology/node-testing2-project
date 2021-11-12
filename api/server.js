const express = require("express")

const Houses = require('./houses/houses-model')

const server = express();

server.use(express.json()); // this

server.get("/", (req, res) => {
	res.status(200).json({ api: "up" });
});

server.get("/houses", (req, res) => {
	Houses.getAll()
		.then(hobbits => {
			res.status(200).json(hobbits);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

server.get("/houses/:id", async (req, res) => {
	res.json(await Houses.getById(req.params.id))
});

server.post("/houses", async (req, res) => {
	res.status(201).json(await Houses.insert(req.body))
});

server.delete("/houses/:id", (req, res) => {
	res.end()
});

server.put("/houses/:id", (req, res) => {
	res.end()
});

module.exports = server;
