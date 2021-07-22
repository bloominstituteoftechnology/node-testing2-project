const express = require('express');
const ipholder = require('./ipholder-model')

const router = express.Router();

router.get("/", (req, res, next) => {
    ipholder.find()
        .then(resp => {
            res.status(200).json(resp);
        }).catch(next);
})

router.post("/", (req, res, next) => {
    const neoIP = req.body;
    ipholder.create(neoIP)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    ipholder.remove(id)
        .then((resp) => {
            res.status(200).json(resp);
        }).catch(next);
})

module.exports = router;