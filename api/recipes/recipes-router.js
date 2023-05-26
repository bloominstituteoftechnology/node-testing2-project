const router = require('express').Router()

const Recipe = require('./recipes-model')

// router.use('*', (req, res, next) => {
//     res.json({api:'up'})
// })
router.get('/', (req, res, next) => {
    Recipe.getAllRecipes()
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(next)
})
router.get("/:recipe_id", (req, res, next) => {
    Recipe.getRecipeId(req.params.recipe_id)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})

router.post('/', async (req,res,next) => {
    try {
        const newAccount = await Recipe.create(req.body)
        res.status(201).json(newAccount)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:recipe_id', (req, res, next) => {
    const {recipe_id} = req.params
    Recipe.updateRecipe(recipe_id, req.body)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})

router.delete('/:recipe_id', (req, res, next) => {
    const {recipe_id} = req.params
    Recipe.deleteRecipe(recipe_id)
    .then(resource => {
        res.json({message: 'Resource has been deleted'})
    })
    .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
       err: err.message,
       stack: err.stack
    })
})

module.exports = router