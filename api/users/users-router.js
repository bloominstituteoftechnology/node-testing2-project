const express = require('express')
const User = require('./users-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    User.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(next)
})
router.get('/:id', (req, res, next) => {
    User.getById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
})
router.post('/', async( req, res, next) => {
    try {
        const newUser = await User.insert(req.body)
        res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
})
router.delete('/:id', (req, res, next) => {
    User.remove(req.params.id)
        .then(user => {
            if(user > 0) {
                res.status(200).json(user)
            } else {
                next({
                    status: 404,
                    message: 'User not found'
                })
            }
        })
        .catch(next)
})
module.exports = router;