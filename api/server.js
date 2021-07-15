const express = require('express')
const server = express()
const KrustyKrew = require('./krustykrew/krustykrew-model.js')

server.use(express.json())

server.get("/", (req,res) =>{
    res.status(200).json({api:"up!!"})
})

server.get("/krustykrew", (req,res) =>{
    KrustyKrew.getAll()
    .then(krustykrew => {
        res.status(200).json(krustykrew)
    })
    .catch(e =>{
        res.status(500).json(e)
    })
})

server.get("/krustykrew/id", (req,res) =>{
    res.end()
})

server.post("/krustykrew", async (req, res) => {
    res
      .status(201)
      .json(await KrustyKrew.insert(req.body))
  });
  server.delete("/krustykrew/:id", (req, res) => {
    res.end()
  });

  server.put("/krustykrew/:id", (req, res) => {
    res.end()
  });
  
module.exports = server