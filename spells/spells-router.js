const router = require('express').Router();
const spells = require('./spells-model');
const validate = require('../middleware/validateSpell');

router.get('/', async (req, res, next) => {
    try{
        const list = await spells.find();

        res.json(list);
    } catch(err){
        res.status(404).json({message: 'Spells not found'});
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const spell = await spells.findById(req.params.id)

        if(spell){
            res.status(200).json(spell);
        }

        res.status(404).json({message: 'Spell not found'});
    } catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newSpell = await spells.add(req.body);
        res.status(201).json(newSpell);
    } catch (err){
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const update = await spells.edit(req.params.id, req.body);

        return res.status(200).json(update);
    } catch(err) {
        res.status(404).json({message: 'Spell not found'});
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const del = await spells.remove(req.params.id);

        return res.status(204).json(del);
    } catch (err) {
        res.status(404).json({message: 'Spell not found'});
        next(err);
    }
});

module.exports = router;



