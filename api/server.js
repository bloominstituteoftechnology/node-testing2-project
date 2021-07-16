const express = require('express')
const server = express()
const KrustyKrew = require('./krustykrew/krustykrew-model.js')
const krustyKrewRouter = require("../api/krustykrew/krustykrew-router.js")
server.use(express.json())

server.get("/", (req,res) =>{
    res.status(200).json({api:"up!!"})
})
server.use('/krustykrew',krustyKrewRouter)

server.get("/krustykrew", (req,res) =>{
    KrustyKrew.getAll()
    .then(krustykrew => {
        res.status(200).json(krustykrew)
    })
    .catch(e =>{
        res.status(500).json(e)
    })
})

server.get("/krustykrew/id",async (req,res) =>{
  try{
    const {id} = req.params
    const data = await KrustyKrew.getById(id)
    res.json(data)
  }catch(err){
    next(err)
  }
})

server.post("/krustykrew", async (req, res) => {
    res
      .status(201)
      .json(await KrustyKrew.insert(req.body))
  });
  server.delete("/krustykrew/:id", async(req, res) => {
    try {
      const deletedKrustyKrew= await KrustyKrew.deleteById(req.params.id)
      res.json(deletedKrustyKrew)
    } catch (err) {
      next(err)
    }
  });

  server.put("/krustykrew/:id", (req, res) => {
    res.end()
  });
  
module.exports = server