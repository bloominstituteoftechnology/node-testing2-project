const express = require('express');
const dbConfig = require('../../data/dbConfig');
const router = express.Router();
//imports
const userModel = require('../../model/userModel');
//exports
module.exports = router;


//GET - Users within the same department after login

router.get('/', restricted(), async (req, res, next)=>{
    const {department} = req.session.user
    
    await userModel.get({department})
    .then(users=>{
        res.status(200).json({ users: users})
    })
    .catch(err=>next(err))
    
})

router.delete('/', restricted(), async (req, res, next)=>{
    await userModel.remove(req.session.user)
    .then(resolve=>{
        req.session.destroy(err=>{
            if(err){
                res.status(401).json({err: err})
            }else{
                res.status(200).json({message: `User was removed from the database. Session was destroyed.`})
            }
        })
    })
    .catch(err=>{
        res.status(401).json({message: `User could not be removed.`})
    })

})

//middlewares

    //restrict
function restricted(){
    return (req, res, next)=>{
        if(req.session.user && req.session.token){
            console.log(`User Authenticated`);
            next();
        }else{
            res.status(403).json({message: `You are unauthorized`})
        }
    }
}