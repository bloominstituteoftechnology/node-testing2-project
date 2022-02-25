/* eslint-disable no-unused-vars */
const router = require('express').Router()
const Streamers = require('./streamer-model')

router.get('/', async (req,res, next) => {
    try {
        const streamers = await Streamers.findAll()
        res.json(streamers)
    } catch (err) {
        next({status:422, message: "streamers not able to be found"})
    }
})
router.get('/:id', async (req,res,next) => {
    try {
    const streamer = await Streamers.find(req.params.id)
    if(!streamer) {
        next({status: 404, message: 'not found'})
    } else {
        req.streamer = streamer
        res.json(streamer)
    }
    } catch (err) {
        next(err)
    }

})
router.post('/', (req,res,next) => {
  let body = req.body
  if (!body.name) {
    res.status(400).json({message: "Please provide name and affiliation for the user"});
} else if (!body.affiliation) {
    res.status(400).json({message: "Please provide name and affiliation for the user"});
} else {
    Streamers.create(body)
        .then(streamer => {
            res.status(201).json(streamer)
        })
        .catch(() => {
            next({status: 404, message: 'could not get streamer'})
        })
    }
})
module.exports = router;