const express = require("express");

  const Hobbits = require("../../data/dataModel.js");

  const dataRouter = require("../../data/dataRouter.js")

  const server = express();

  server.use(express.json());

  server.use("/api/data", dataRouter)

  server.get("/", (req, res) => {
   res.status(200).json({ api: "up" });
 });

 
  module.exports = server;