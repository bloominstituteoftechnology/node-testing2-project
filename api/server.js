const express = require("express")

const User = require("./users/users-model")

const server = express()


server.use(express.json())


server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
})

server.get("/users", (req, res) => {
    User.getAll()
        .then( result => {
            res.json(result)
        })
})

server.get("/users/:id", (req, res) => {
    User.getById(req.params.id)
        .then( result => {
            if (result == null) {
                res.status(400).json({ message: "user does not exist"})
            } else {
                res.json(result)
            }
        })
})

server.post("/users", async (req, res) => {
    User.add(req.body)
        .then( result => {
            res.status(201).json(result)
        })
})

server.delete("/users/:id", (req, res) => {
    User.remove(req.params.id)
        .then( result => {
            res.json(result)
        })
})

server.get("/onlyIds", (req, res) => {
    User.getAllIds()
        .then( result => {
            res.json(result)
        })
})

server.get("/onlyNames", (req, res) => {
    User.getAllNames()
        .then( result => {
            res.json(result)
        })
})

server.get("/asc", (req, res) => {
    User.getNamesAsc()
        .then( result => {
            res.json(result)
        })
})

server.get("/desc", (req, res) => {
    User.getNamesDesc()
        .then( result => {
            res.json(result)
        })
})


server.get("/descIds", (req, res) => {
    User.getIdsDesc()
        .then( result => {
            res.json(result)
        })
})

module.exports = server;