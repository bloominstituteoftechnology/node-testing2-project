const Dogs = require('./dogs-model')
const { checkBreedUnique, checkDogObjectComplete, checkIdValid} = require('./dogs-middleware')

const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    Dogs.getAll()
        .then(dogs => {
            res.status(200).json(dogs)
        })
        .catch(next)
})
router.get('/:id', (req, res, next) => {
    Dogs.getById(req.params.id)
        .then(dog => {
            res.status(200).json(dog)
        })
        .catch(next)
})
router.delete('/:id', checkIdValid, (req, res, next) => {
    Dogs.remove(req.params.id)
        .then(dog => {
            res.status(200).json(dog)
        })
        .catch(next)
})
router.post('/', checkDogObjectComplete, checkBreedUnique, (req, res, next) => {
    Dogs.add(req.dog)
        .then(dog => {
            res.status(201).json(dog)
        })
        .catch(next)
})
router.put('/:id', checkIdValid, checkDogObjectComplete, checkBreedUnique, (req, res, next) => {
    Dogs.update(req.params.id, req.body)
    .then(dog => {
        res.status(200).json(dog)
    })
})
module.exports = router