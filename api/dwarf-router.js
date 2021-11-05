const express = require('express')
const Dwarfs = require('./dwarf-model')

const router = express.Router()

server.get("/dwarfs", (req, res) => {
    Dwarfs.getAll()
      .then(dwarfs => {
        res.status(200).json(dwarfs);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.get("/dwarfs/id", (req, res) => {
    res.end()
  });
  
  server.post("/dwarf", (req, res) => {
    dwarf.insert(req.body)
      .then(dwarfs => {
        res.status(200).json(dwarfs);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.delete("/dwarf/:id", (req, res) => {
    res.end()
  });
  
  server.put("/dwarf/:id", (req, res) => {
    res.end()
  });




module.exports = router