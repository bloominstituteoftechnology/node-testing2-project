const express = require("express");

const db = require("../../data/db-config.js");

const router = express.Router();


router.post("/", (req, res) => {
    const userData = req.body;
  
    db("users")
      .insert(userData, "id")
      .then(ids => {
        res.status(201).json({ created: ids[0] });
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new user", err });
      });
  });

  
router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    db("users")
      .where({ id })
      .del()
      .then(count => {
        if (count) {
          res.json({ removed: count });
        } else {
          res.status(404).json({ message: "Could not find user with given id" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to delete user", err });
      });
  });
  
  module.exports = router;