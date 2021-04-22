const router = require('express').Router()
const mw = require('../middleWare/middleware')
const { insert, deleteBy } = require('../model/memento-model');

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
 router.delete('/:id', mw.validateID, async (req,res,next) => {
  try {
    await deleteBy(req.params.id)
    res.status(200).json(`${req.user.name} deleted >:)`)
  } catch (err) {
    next(err)
  }
})




module.exports = router