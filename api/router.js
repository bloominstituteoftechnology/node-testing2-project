const express = require('express');
const Model = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Model.findAll()
    .then(resp => {
        res.status(200).json(resp);
    })
    .catch(error => {
        next(error);
    })
})

router.get('/:gender', (req, res, next) => {
    Model.findByGender(req.params.gender)
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch(error => {
        next(error);
    })
})

router.post('/', (req, res, next) => {
    Model.addName(req.body)
    .then(resp => {
        res.status(201).json(resp);
    })
    .catch(error => {
        next(error);
    })
})


module.exports = router;