const express = require("express");
const router = express.Router();
const Pokemon = require('./pokemon-model')

router.post('/', async (req, res, next) => {
    let x = await Pokemon.addmon(req.body);
    res.status(201).json(x)
})

router.delete('/:pokemon_id', async (req, res, next) => {
    try {
        await Pokemon.delmon(req.params.pokemon_id)
        res.status(204).json({message: "Deleted successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error...");
    }
})


module.exports = router;