const router = require("express").Router();
const Users = require("./users-model.js");
const {checkValidUser} = require("./user-middleware.js");
const bcrypt = require("bcryptjs");

router.get("/", (req,res,next)=>{
    Users.find()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(next);
})

router.post("/", checkValidUser, (req, res, next)=>{
    let user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash
    Users.add(req.body)
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(next)
})

router.delete("/:id", (req,res,next)=>{
    Users.deleteById(req.params.id)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(next)
})

module.exports = router;