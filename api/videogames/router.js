const router = require("express").Router();
const Videogames = require('./model')

router.get('/', (req, res, next) => {
    Videogames.findAll()
        .then(videogames => {
            res.json(videogames)
        })
        .catch(next)
})

router.get('/genere/:id', (req, res, next) => {
    Videogames.findByGenere(req.params.id)
        .then(vgGenereList => {
            res.json(vgGenereList)
        })
        .then(next)
})

router.post('/', (req, res, next) => {
    const { vg_name, vg_year, vg_rating, genere_name } = req.body
    Videogames.add({ vg_name, vg_year, vg_rating, genere_name })
        .then(newVideogame => {
            res.json(newVideogame)
        })
        .catch(next)
})

module.exports = router