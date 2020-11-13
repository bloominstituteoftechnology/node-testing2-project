const Billy = require('../model/billy_model')
const express = require('express')

const router = express.Router()

router.get('/', async (req,res,next) => {
    try {
        res.json(await Billy
            .find())
    } catch(err) {
        next(err)
    }
})
router.get('/:id', async (req,res,next) => {
    try {
        const goo = await Billy
        .findById(req.params.id)
        if(!goo) {
            return res.status(404).json({
                message: " not found"
            })
        }
        res.json(goo)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const goo = await Billy.create(req.body)
        res.status(201).json(goo)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req,res,next) => {
    try {
        const goo = await Billy
        .remove(req.params.id)
    if(!goo) {
        return res.status(404).json({
            message: "not found"
        })
    }
    res.json(goo)
    } catch(err) {
        next(err)
    }


})

module.exports = router 