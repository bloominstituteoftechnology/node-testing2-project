const express = require('express');
const router = express.Router();
const Pokemons = require('./pokemonsModel');

router.get('/', async (req, res, next) => {
    try {
        const pokemons = await Pokemons.find();
        res.json(pokemons);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const pokemon = await Pokemons.findById(id);
        if(pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({
                message:'Pokemon not found'
            })
        }
    } catch (err) {
        next(err);
    }
})

router.post('/', async(req, res, next) => {
    try {
        const pokemonData = req.body;
        const newPokemon = await Pokemons.add(pokemonData);
        res.status(201).json(newPokemon);
    } catch (err) {
        next(err);
    }
})

module.exports = router;