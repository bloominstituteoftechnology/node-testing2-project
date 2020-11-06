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

module.exports = router