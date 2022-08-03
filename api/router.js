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

    if(req.params.gender !== 'male' || req.params.gender !== 'female'){
        next({status: 201, message: 'There are only 2 genders please enter male or female'})
    }

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