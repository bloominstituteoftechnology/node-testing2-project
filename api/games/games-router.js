const router = require('express').Router()

const Games = require('./games-model')

router.get('/', async (req, res, next) => {
    try {
        const games = await Games.getAll()
        res.json(games)
      } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const games = await Games.getById()
        res.json(games)
      } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const games = await Games.create()
        res.json(games)
      } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const games = await Games.remove()
        res.json(games)
      } catch (err) {
        next(err)
    }
})

module.exports = router
