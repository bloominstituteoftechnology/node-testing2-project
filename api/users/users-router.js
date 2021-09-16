const router = require("express").Router();
const Users = require('./users-model')
const { restricted, only } = require('../auth/auth-middleware')



router.get('/', (req, res, next) =>{
    res.json('users')
    next()
})


router.get('/:user_id', (req, res, next) => {
    next()
})

module.exports = router; 