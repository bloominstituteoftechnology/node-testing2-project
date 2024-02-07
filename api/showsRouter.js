const express = require('express')
const router = express.Router()
const Show = require('./showsModel.js')
const db = require('../data/dbConfig.js')

router.get("/", async (req, res) => {
    const shows = await Show.getAll();
    res.status(200).json(shows);
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const show = await Show.getById(id);
  
    if (show) {
      res.status(200).json(show);
    } else {
      res.status(404).json({ message: "show not found" });
    }
  });
  
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    const existingshow = await db("shows")
      .where("show_id", id)
      .first();
  
    if (!existingshow) {
      return res.status(404).json({ message: "show not found" });
    }
    const updatedShow = await Show.updatedShow(id, updates);
    res.status(200).json(updatedShow);
  });



router.delete('/:id', async (req,res) => {
    const id = req.params.id
    const delShow = await Show.deleteShow(id)
    res.status(200).json(delShow)
}) 

module.exports = router