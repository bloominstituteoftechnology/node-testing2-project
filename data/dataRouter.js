const express = require("express");

  const Data = require("./dataModel.js")

  const router = express.Router();

  router.get('/', (req, res)=>{
     Data.getAll()
     .then(data=>{
         res.status(200).json(data);
     })
 })

  router.get('/:id', (req, res)=>{
     Data.findById(req.params.id)
     .then(data=>{
         if(data){
             res.status(200).json(data)
         }
         else{
             res.status(404).json({error: "data not found"})
         }
     })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error: "could not load data"})
     })
 })

  router.post("/", (req, res)=>{
     const daytuh = req.body;
     if(validateData(daytuh)){
         Data.insert(daytuh)
         .then(data=>{
             res.status(201).json(data)
         })
         .catch(err =>{
             res.status(500).json({error: "could not insert data"})
         })
     }
     else{
         res.status(400).json({error: "you do not have enough data"})
     }
 })

  router.delete("/:id", validateDataId, (req, res)=>{
         Data.remove(req.params.id)
         .then(data=>{
             res.status(200).json(data)
         })
         .catch(err=>{
             console.log(err)
             res.status(500).json({error: "could not remove the data"})
         })
 })

  function validateData(data){
     return Boolean(data.dataValue1 && data.dataValue2)
 }

  function validateDataId(req, res, next) {
     Data.findById(req.params.id)
     .then(data=>{
         if(data){
             next();
         }
         else{
             res.status(404).json({error: "data not found"})
         }
     })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error: "could not load data"})
     })
 }

  module.exports = router; 