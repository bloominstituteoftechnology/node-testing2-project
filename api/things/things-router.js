const router = require('express').Router()
const Things = require('./things-model')
const checkThingPresent = require('./things-middleware')

router.get('/', (req, res, next) => {
    Things.getAll()
        .then(things => {
            res.status(200).json(things)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', checkThingPresent, (req, res, next) => {
    Things.addThing(req.body)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router
