const { findBy } = require('../model/memento-model');

async function validateID(req,res,next){
  const {id} = req.params
  if(!id){
    next({status: 404, message: 'nothing find by that id'})
  }
  try {
    const user = await findBy(id)
    if(!user){
      next({status:404, message: 'user not exist'})
    }else{
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  validateID
}