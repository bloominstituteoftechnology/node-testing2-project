const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express()

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (res, req) => {
    res.status(200).json({ api: "it lives!"});
});

module.exports = server;