const router = require('express').Router()

const Plants = require('./plants/plants-model')

router.get('/api/plants', (req, res)=>{
    res.end()
})

router.get('/api/plants/:id', (req, res)=>{
    res.end()
    
})

router.post('/api/plants',(req, res)=>{
    res.end()
})

router.delete('/api/plants/:id', (req, res)=>{
    res.end()
})

module.exports = router