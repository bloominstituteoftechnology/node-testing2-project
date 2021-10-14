const express = require('express');
const router = express.Router();
const Pet = require('./pets-model');
const {
    validatePet,
    checkPetId
} = require('./pets-middleware');

router.get('/', async (req, res, next) => {
    try {
        const pets = await Pet.getAll();
        res.status(200).json(pets);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', checkPetId, async (req, res) => {
    res.json(req.pet);
});

router.post('/', validatePet, async (req, res, next) => {
    try {
        res.status(201)
            .json(await Pet.insert(req.body));
    } catch (err) {
        next(err);
    }
});

router.put(
    '/:id',
    checkPetId,
    validatePet,
    async (req, res, next) => {
        try {
            res.json('editing a new pet');
        } catch (error) {
            next(error);
        }
    });

router.delete('/:id', async (req, res, next) => {
    try {
        res.status(202).json(await Pet.remove(req.params.id));
    } catch (err) {
        next();
    }
});

module.exports = router;