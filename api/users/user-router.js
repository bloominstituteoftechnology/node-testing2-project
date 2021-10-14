const express = require('express');
const mb = require('./user-model');
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json('im router')
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deletted = await mb.remove(id)

    res.status(200).json(deletted)



})

module.exports = router;