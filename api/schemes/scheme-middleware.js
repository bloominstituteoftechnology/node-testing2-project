const db = require('../../data/db-config')
const Scheme = require('./scheme-model')
 /*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  //Solution, Alternative
  try {
    const existing = await db('schemes')
      .where('scheme_id', req.params.scheme_id)
      .first()
    if(!existing) {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
              // try {
              //   const scheme_id = await Scheme.findById(req.params.scheme_id)
              //   if(!scheme_id) {
              //     next({
              //       status: 404,
              //       message: `scheme with scheme_id ${req.params.scheme_id} not found`
              //     })
              //   } else {
              //     req.scheme_id = scheme_id
              //     next()
              //   }
              // } catch (err) {
              //   next(err)
              // }

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  // Alternative: const { scheme_name } = req.body
  //http testing:   " := " means send out number, not number as string

  const scheme_name = req.body.scheme_name
  if(!scheme_name || 
    scheme_name === undefined || 
    typeof scheme_name !== 'string') {
    next({
      status: 400,
      message: 'invalid scheme name'
    })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  //Alternative const { instructions, step_number } = req.body
  const instructions = req.body.instructions
  const step_number = req.body.step_number
  if(!instructions || 
    instructions === undefined || 
    typeof instructions !== 'string' ||
    typeof step_number !== 'number' || //will number and integer both work?:  No, integer gives invalid step for some reason
    step_number <= 1) {
      next({
        status: 400,
        message: 'invalid step'
      })
    } else {
      next()
    }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
