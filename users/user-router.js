const router = require('express').Router()
const Users = require('./user-model')

router.get("/", (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json({ data:users })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "internal server error."})
    })
})

router.post("/", (req, res) => {
    const user = req.body
    Users.insert(user)
    .then(([id]) => {
        Users.findById(id).then(user => {
            return res.status(201).json({ data: user })
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "internal server error."})
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Users.findById(id)
    .then(response => {
        if(response){
        Users.remove(id).then(() => {
            res.status(200).json( { deleted: response })
        })
        } else {
            res.status(404).json({ message:"user doesnt exist"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "internal server error."})
    })
})

module.exports = router