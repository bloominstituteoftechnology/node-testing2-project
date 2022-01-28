const express = require('express')

const moviesRouter = require('./movies/movies-router')

const server = express()

server.use(express.json());

server.use('/api/movies', moviesRouter)

// server.get("/", (req, res) => {
//     res.status(200).json({ api: "up" });
//   });

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: "OOPS Something is obviously wrong"
    })
})

module.exports = server