const express = require("express")
const cors = require("cors")
const spellsRouter = require("./spells/spells-router");

const server = express()

server.use(cors())
server.use(express.json())

server.use("/spells", spellsRouter)
server.get("/", (req, res) => {
	res.json({
		message: "Hello, world",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;