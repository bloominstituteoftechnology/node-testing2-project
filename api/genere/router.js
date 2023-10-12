const router = require("express").Router();
const Genere = require('./model')

router.get( '/:id', (req, res, next) => {
    Genere.findById(req.params.id)
        .then(genere => {
            if (genere?.length === 0) {
                res.status(404).send()
            }
            res.status(200).json(genere)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const { genere_name } = req.body
    Genere.add(genere_name)
        .then(newGenere => {
            res.status(201).json(newGenere)
        })
        .catch(next)
})

module.exports = router