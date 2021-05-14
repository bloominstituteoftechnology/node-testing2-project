const express = require("express")
const charactersRouter = require("./hp-characters/characters-router")

const server = express()

server.use(express.json())
server.use(charactersRouter)

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to Kelsey's API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server