const router = require("express").Router();
const Users = require('./users-model')
// const { restricted, only } = require('../auth/auth-middleware')



router.get('/',  async (req, res, next) =>{
   Users.find()
   .then(users => {
       res.status(200).json(users)
   })
   .catch(next)
})


router.get('/:user_id', (req, res, next) => {
    next()
})

module.exports = router; 