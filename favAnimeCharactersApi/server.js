const express = require("express")
const cors = require("cors")
const charsRouter = require("./charactersRouter")

const server = express()

server.use(cors())
server.use(express.json())

server.use("/chars", charsRouter)
server.get("/", (req, res) => {
	res.json({
		message: "My fav Characters!",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Server error",
	})
})

module.exports = server