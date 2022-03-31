const router = require('express').Router()
const Jokes = require('./jokes-model')

router.get('/', (req, res, next) => {
  Jokes.getAll()
    .then(jokes => {
      res.status(200).json(jokes)
    })
    .catch(next)
})

router.get('/:joke_id', (req, res, next) => {
  Jokes.getById(req.params.joke_id)
    .then(joke => {
      res.status(200).json(joke)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Jokes.create(req.body)
    .then(joke => {
      res.status(201).json(joke)
    })
    .catch(next)
})

module.exports = router