const router = require("express").Router()
const Aphorisms = require("./model")

//Post to add phrase
router.post("/", async (req, res, next) => {
    try {
        const newPhrase = await Aphorisms.add(req.body)
        res.status(201).json(newPhrase)
    }
    catch(err) { next(err)}})

//Delete phrase
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    const remove = await Aphorisms.deletePhrase(id)
    res.status(200).json(remove)
    next()
})
module.exports = router