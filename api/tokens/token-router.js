const express = require('express');
const Tokens = require('./tokens-model.js');

const router = express.Router();

// router's root endpoint, returns all tokens
router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await Tokens.getAll());
    } catch (err) {
       next(err); 
    }
    
})

// endpoint returns only token specified in req.params
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        res.status(200).json(await Tokens.getById(id));
    } catch (err) {
        next(err);
    }
})

// endpoint returns token with info
router.get('/:id/info', async (req, res, next) => {
    const { id } = req.params;
    try {
        res.status(200).json(await Tokens.findInfo(id));
    } catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    const token = req.body;
    try {
        res.status(201).json(await Tokens.add(token))
    } catch (err) {
        next(err)
    }
})

router.post('/:id/', async (req, res, next) => {
    const { id } = req.params;
    const info = req.body;
    try {
        res.status(201).json(await Tokens.addInfo(id, info));
    } catch (err) {
        next(err);
    }
})

module.exports = router;