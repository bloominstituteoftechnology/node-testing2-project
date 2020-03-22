const express = require('express');
const Actions = require('./actions-model');
const restrict = require('../middleware/restrict')
const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        res.json(await Actions.findActions())
    }catch(err) {

    }
})

router.get('/:id', async(req, res, next) => {
    const {id} = req.params;
    const action = await Actions.findById(id)
   try{
    if(action) {
        res.json(action)
    }else {
        res.json(404).json({message: "The action was not found."})
    }
   }catch(err){
       next(err);
   }
})

router.delete('/:id', async(req, res, next) => {
    const {id} = req.params
    const found = await Actions.findById(id)
   
    try{
        if(found) {
            res.json(await Actions.removeAction(id))
        }else {
            res.status(404).json({message: "The Action was not found."})
        }
        
    }catch(err) {
        next(err);
    }

}) 


module.exports = router;
