const router = require('express').Router()
const {insert} = require('../model/memento-model');

// [POST] - /api/mori/
router.post('/', (req,res,next) => {

  if(!req.body.name){
    next({status: 401, message: 'name is needed'})
  }

  insert(req.body)
    .then(resp => res.json(resp))
    .catch(next)

})

// [delete] - /api/mori/:id
router.delete('/:id', (req,res,next) => {
  res.json('deleted')
})




module.exports = router