const router = require('express').Router();
const Cars = require('./cars-model');
// require middleware here if you build it someday

router.get('/', (req, res, next) => {
    res.json({ message: 'working on get cars/' })
});

router.get('/:id', (req, res, next) => {
    res.json({ message: 'working on get cars/:id' })
});

module.exports = router;