const express = require('express');
const router = express.Router();
const User = require('./users-model');

router.get("/", (req, res) => {
    User.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

router.get("/:id", (req, res) => {
    return null
})

router.post("/", (req, res) => {
    return null
})

module.exports = router;