const router = require('express').Router()

router.post('/register', (req, res, next) =>{
    res.json('register')
    next()
})

router.post('/login', (req, res, next) =>{
    res.json('login')
    next()
})

module.exports = router