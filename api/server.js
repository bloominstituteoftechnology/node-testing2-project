const express = require("express")
const aphorismsRouter = require("./info/router")
const server = express()

server.use(express.json())

server.use("/api/aphorisms", aphorismsRouter)

server.use("*", (req, res, next) => {
    next({ status: 400, message: "not found." });
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    });
});
module.exports = server