const express = require('express');
const Hobbits = require("./hobbit-model");
const router = express.Router()

  
router.post("/", (req, res) => {
Hobbits.create(req.body)
.then(hobbit => {
    res.status(201).json(hobbit);
})
.catch(err => {
    res.status(500).json(err)
})
});
  
  router.delete("/:id", (req, res) => {
    Hobbits.remove(req.params.id)
    .then(hobbit => {
        res.status(200).json(hobbit)
    })
    .catch(err => {
        res.status(500).json(err)
    })
  });
  
module.exports = router;