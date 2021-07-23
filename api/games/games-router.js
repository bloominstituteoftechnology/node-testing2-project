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
        const games = await Games.getById(req.params.id)
        res.json(games)
      } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.status(201)
            .json(await Games.create(req.body))
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
