const express = require("express");
const server = express();

const CPURouter = require("./pcparts/components/CPU/CPURouter");
const GPURouter = require("./pcparts/components/GPU/GPURouter");

server.use(express.json());

server.use("/cpu", CPURouter)
server.use("/gpu3", GPURouter)

module.exports = server;
