const router = require("express").Router();
const Genere = require('./model')

router.get( '/:id', (req, res, next) => {
    Genere.findById(req.params.id)
        .then(genere => {
            res.status(200).json(genere)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const { genere_name } = req.body
    Genere.add(genere_name)
        .then(newGenere => {
            res.json(newGenere)
        })
        .catch(next)
})

module.exports = router