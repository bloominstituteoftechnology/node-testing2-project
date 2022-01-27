const router = require("express").Router();

const Jones = require("./joneses-model");

router.get("/", (req, res, next) => {
  Jones.findAll()
    .then(joneses => {
        res.status(200).json(joneses);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    Jones.findById(req.params.id)
        .then(jones => {
            res.status(200).json(jones);
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Jones.add(req.body)
        .then(jones => {
            res.status(201).json(jones);
        })
        .catch(next);
})

module.exports = router;
