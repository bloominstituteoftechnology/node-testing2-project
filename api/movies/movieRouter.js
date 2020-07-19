const express = require('express');

const Movies = require('./movieModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Movies.find()
  .then(movies => {
    res.status(200).json(movies);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get movies' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Movies.findById(id)
  .then(movie => {
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Could not find movie with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get movies' });
  });
});

router.post('/', (req, res) => {
  const movieData = req.body;

  Movies.add(movieData)
  .then(movie => {
    res.status(201).json(movie);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new movie' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Movies.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(200).json(deleted);
    } else {
      res.status(404).json({ message: 'Could not find movie with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete movie' });
  });
});

module.exports = router;