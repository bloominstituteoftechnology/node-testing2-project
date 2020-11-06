const Vampires = require('./vampiresModel')
const express = require('express')

const router = express.Router()

router.get('/', async (req,res,next) => {
    try {
        res.json(await Vampires.find())
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const vamps = await Vampires.findById(req.params.id)
        if(!vamps) {
            return res.status(404).json({
                message: "vampire not found"
            })
        }
        res.json(vamps)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const vamps = await Vampires.create(req.body)
        res.status(201).json(vamps)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req,res,next) => {
    try {
        const vamps = await Vampires.remove(req.params.id)
    if(!vamps) {
        return res.status(404).json({
            message: "vampie not found"
        })
    }
    res.json(vamps)
    } catch(err) {
        next(err)
    }
    
    
})
module.exports = router