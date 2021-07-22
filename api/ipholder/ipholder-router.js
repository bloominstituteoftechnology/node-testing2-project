const express = require('express');
const ipholder = require('./ipholder-model')

const router = express.Router();

router.get("/", async (req, res, next) => {
    return await ipholder.find();
})

router.post("/", (req, res, next) => {
    const neoIP = req.body;
    ipholder.create(neoIP)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

module.exports = router;