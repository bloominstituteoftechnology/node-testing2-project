const router = require('express').Router();
const jokesModel = require('./jokes-model')


router.delete("/:id", async (req, res) => {
    const deleteJoke = await jokesModel.deleteJoke(req.params.id)
    res.status(200).json(deleteJoke)
})






// don't forget to export the router
module.exports = router