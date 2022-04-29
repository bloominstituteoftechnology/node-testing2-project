const express = require('express');
const router = express.Router();

const Joke = require('./jokesModel.js');

router.get('/', async (req, res) => {
    const jokes = await Joke.readJokes()
    res.status(200).json(jokes)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const joke = await Joke.readJokesById(id);
    if (joke) {
        res.status(200).json(joke);
    } else {
        res.status(404).json({ message: 'Joke not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const delJoke = await Joke.deleteJoke(id);
    if (delJoke) {
        res.status(200).json(delJoke);
    } else {
        res.status(404).json({ message: 'Joke not found' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updateJoke = await Joke.updateJoke(id, req.body);
    if (updateJoke) {
        res.status(200).json(updateJoke);
    } else {
        res.status(404).json({ message: 'Joke not found' });
    }
});

module.exports = router;