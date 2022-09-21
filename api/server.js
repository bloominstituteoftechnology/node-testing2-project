const express = require("express");

const Students = require("./students-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ api: "running" });
});

server.get("/students", async (req, res) => {
  try {
    const getAll = await Students.getAll();
    res.json(getAll);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

server.get("/students/:id", async (req, res) => {
  try {
    const getById = await Students.getById(req.params.id);
    res.json(getById);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

server.post("/students", async (req, res) => {
  try {
    const addStudent = await Students.post(req.body);
    res.status(201).json(addStudent);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

server.put("/students/:id", async (req, res) => {
  try {
    const update = await Students.update(req.params.id, req.body);
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = server;
