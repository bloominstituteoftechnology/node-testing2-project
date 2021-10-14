const express = require('express');
const {
    validatePet,
    checkPetId
} = require('./pets-middleware');

const router = express.Router();
const Pet = require('./pets-model');

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

router.put('/:id', checkPetId, validatePet,  (req, res, next) => {
    Pet.update(req.params.id, { name: req.body.name })
        .then(() => {
            return Pet.getById(req.params.id);
        })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next);
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.status(202).json(await Pet.remove(req.params.id));
    } catch (err) {
        next();
    }
});

module.exports = router;