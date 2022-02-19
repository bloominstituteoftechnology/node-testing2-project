const router = require('express').Router()
const Characters = require('./characters-model')

router.get('/', (req, res, next) => {
    Characters.getAll()
    .then(characters => {
        res.status(200).json(characters)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    try{
    const character = Characters.getById(req.params.id)
    if(!character){
        res.status(404).json({
            message: 'Character with specified id does not exist'
        })
    }else{
        res.json(character)
    }
    }catch(err){
        res.status(500).json({
            message: 'Could not get character information'
        })
    }
})

router.post('/', (req, res, next) => {
    const  { name } = req.body
    if(!name){
        res.status(400).json({
            message: 'Please provide name of character'
        })
    }else {
        Characters.insert({ name })
        .then(({ id }) => {
            return Characters.getById(id)
        })
        .then(character => {
            res.status(201).json(character)
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error creathing new character'
            })
        })
    }
})

module.exports = router     