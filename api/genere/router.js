const router = require("express").Router();
const Genere = require('./model')

router.get( '/:id', (req, res, next) => {
    Genere.findById(req.params.id)
        .then(genere => {
            res.status(200).json(genere)
        })
        .catch(next)
})

router.post('create new genere')

module.exports = router