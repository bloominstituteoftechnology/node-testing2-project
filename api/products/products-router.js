const express = require("express")
const products = express.Router()
const Product = require("./products-model")
const {restricted}= require("../auth/auth-middleware")
const{checkPayload}=require("./products-middleware")

products.get("/", (req, res, next) => {
    Product.findAll()
        .then((prod) => {
            res.json(prod)
        })
        .catch(next)
})

products.get("/:id",(req, res, next) => {
    Product.findById(req.params.id)
        .then((prod) => {
            res.json(prod)
        })
        .catch(next)
})

products.post("/",checkPayload, (req, res, next) => {
    Product.insert(req.body)
        .then((prod) => {
            res.status(201).json(prod)
        })
        .catch(next)
})
products.delete("/:id",(req, res, next) => {
    Product.remove(req.params.id)
    .then((prod) => {
        res.json(prod)
    })
})



module.exports = products