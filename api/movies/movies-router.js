 const express = require('express')
// const router = require('express').Router()

const Movies = require("./movies-model.js"); 

const router = express()

  
router.get("/", (req, res) => {
    Movies.getAll()
      .then(hobbits => {
        res.status(200).json(hobbits);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.get("/:id", (req, res) => {
    res.end()
  });
  
  router.post("/", async (req, res) => {
    res.status(201).json(await Movies.insert(req.body))
  });
  
  router.delete("/:id", (req, res) => {
    res.end()
  });
  
  router.put("/:id", (req, res) => {
    res.end()
  });

module.exports =router