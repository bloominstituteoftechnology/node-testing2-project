const express = require("express");
const items = require("./itemsRouter");
const server = express();

server.use(express.json());
