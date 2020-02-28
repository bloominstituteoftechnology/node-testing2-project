const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("../router/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", userRouter);

server.get("/", (res, req) => {
    res.status(200).json({ api: "it lives!"});
});

module.exports = server;