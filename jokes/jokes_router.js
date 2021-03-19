const express = require("express")
const {addJoke, deleteJoke} = require("./jokes_model")

const router = express.Router()

router.post("/", (req, res, next) => {
    const joke = req.body
    addJoke(joke)
    .then(id => res.json(`Joke has been added with the following id ${id}`))
    .catch(next)
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id
    deleteJoke(id)
    .then(id => res.json(`Joke has been deleted`))
    .catch(next)
})

module.exports = router