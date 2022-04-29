const express = require('express');
const router = express.Router();

const Joke = require('./jokesModel.js');

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const delJoke = await Joke.deleteJoke(id);
    if (delJoke) {
        res.status(200).json(delJoke);
    } else {
        res.status(404).json({ message: 'Joke not found' });
    }
});

module.exports = router;