const express = require('express');
const Users = require('./user-model');
const router = express.Router()
const restrict = require('../middleware/restrict');


router.get('/',restrict(), async(req, res, next) => {
    try {
        res.json(await Users.find())
    }catch(err) {
        next(err);
    }
})

router.get('/:id', async(req, res, next) => {
    const {id} = req.params;
    const idExists = await Users.findBy({id}).first()
    try {
        if(idExists) {
            res.status(200).json(await Users.findById(id))
        }else {
            res.status(404).json({message: "User not found."})
        }
        

    }catch(err) {
        next();
    }
})

router.get('/:id/actions', async(req, res, next) => {
    const {id} = req.params;
    const idExists = await Users.findBy({id}).first()
    try {
        if(idExists) {
            res.status(200).json(await Users.findUserActions(id))
        }else {
            res.status(404).json({message: "User not found."})
        }
        

    }catch(err) {
        next();
    }
})

router.post('/:id/actions', async(req, res, next) => {
    const newAction = req.body;
    const id = req.params.id;
    try {
        res.status(201).json(await Users.addAction(newAction, id))
    }catch(err) {
        next();
    }
})



module.exports = router;