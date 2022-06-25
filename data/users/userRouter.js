const express = require('express')
const router = express.Router()
const {getAll,getById,addUser, update} = require('./users-model')


router.use(express.json())

router.get('/', (req,res,next)=>{
    getAll()
        .then(result => res.json(result))
        .catch(next)
})


router.get('/:id', (req,res,next)=>{
    getById(req.params.id)
        .then(result=> result ? res.json(result) : next({status:404, message:'Could not find ID'}))
        .catch(next)
})

router.post('/',(req,res,next)=>{
    addUser(req.body)
        .then(result=>res.json(result))
        .catch(next)
})

router.put('/:id', (req,res,next)=>{
    update(req.params.id, req.body)
    .then(result=> result ? res.json(result) : next({status:404, message:'Could not find ID'}))
        .catch(next)
})

module.exports = router
