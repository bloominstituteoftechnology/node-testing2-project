const express = require('express');
const Flowers = require('./flowers-model');
const router = express.Router();

router.get('/', (req, res, next) => {
    Flowers.get()
    .then(flowers=>{
        res.json(flowers)
    })
    .catch(next)
})

router.post('/', (req,res,next) => {
    const newFlower = req.body
    Flowers.add(newFlower)
    .then(flower=>{
        res.status(201).json(flower)
    })
    .catch(next)
})

router.delete('/:id', (req,res,next) => {
    Flowers.del(req.params.id)
    .then(flower=>{
        res.status(200).json(flower)
    })
    .catch(next)
})


module.exports = router