const router = require('express').Router()
const Resources = require('./resource_model')
const { checkInDb } = require('./resource-middleware')


router.post('/', checkInDb, async (req, res, next) => {
   try {
   const newRec = await Resources.add(req.body)
   res.status(201).json(newRec)
   } catch(err) {
      next(err)
   }
})

router.delete('/:id', async (req, res, next) => {
   const { id } = req.params
   const remove = await Resources.deleteRec(id)
   res.status(200).json(remove)
})




module.exports = router