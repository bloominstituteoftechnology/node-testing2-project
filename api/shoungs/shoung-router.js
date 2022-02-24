const express = require('express');
const Shoungs = require('./shoung-model');
const { checkUserId } = require('./shoung-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Shoungs.get()
        .then(shoungs => {
            res.status(200).json(shoungs);
        })
        .catch(next)
});

router.get('/:id', checkUserId, (req, res, next) => {
    Shoungs.getById(req.params.id)
        .then(shoung => {
            res.status(200).json(shoung)
        })
        .catch(next)
});

router.post('/', (req, res, next) => {
    Shoungs.insert(req.body)
        .then(shoung => {
            res.status(201).json(shoung)
        })
        .catch(next)
});

router.put('/:id', checkUserId, (req, res, next) => {
    Shoungs.update(req.params.id, req.body)
        .then(shoung => {
            res.status(200).json(shoung)
        })
        .catch(next)
});

router.delete('/:id', checkUserId, (req, res, next) => {
    Shoungs.remove(req.params.id)
        .then(shoung => {
            res.status(200).json(shoung)
        })
        .catch(next)
})


module.exports = router;