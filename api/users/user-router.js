const express = require('express');
const router = express.Router();
const User = require('./users-model');

router.get("/", (req, res, next) => {
    User.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next);
})

router.get("/:id", (req, res, next) => {
    User.getById(req.params.id)
        .then(user => {
            if(!user){
                next({ status: 404, message: 'user not found' })
            }else {
                res.status(200).json(user)
            }
        })
})

router.post("/", (req, res, next) => {
    User.insert(req.body)
        .then(user => {
            if(!user.name.trim()){
                next({ status: 401, message: "name field required" })
            } else if(user.name.length < 3) {
                next({ status: 401, message: "name needs to be at least 3 chars long"})
            } else {
                const newUser = {id: user.id, name: user.name.trim()}
                res.status(201).json(newUser)
            }
        })
})

module.exports = router;