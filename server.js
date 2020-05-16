const express = require("express");
const carsRouter = require("./cars/cars-router");

const server = express();

server.use(express.json());

server.use("/cars", carsRouter);

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to our API!",
  });
});

module.exports = server;
