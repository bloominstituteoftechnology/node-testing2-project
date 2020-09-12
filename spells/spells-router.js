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
    } catch(err) {
        res.status(404).json({message: 'Spell not found'});
        next(err);
    }
});

router.post('/', validate, async (req, res, next) => {
    try {
        const spell = await spells.findBy({name}).first();

        if (spell){
            return res.status(409).json({message: 'Name is already taken.'})
        } else {
            return res.status(201).json(req.body)
        }
    } catch (err){
        res.status(404).json({message: 'Spell not found'});
        next(err);
    }
});

router.put('/:id', validate, async (req, res, next) => {
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



