const db = require('../../data/db-config')

function checkDogObjectComplete(req, res, next) {
    const {breed, countryOrigin, avgWeightPounds} = req.body
    if(!breed || !countryOrigin || !avgWeightPounds) {
        next({status: 400, message: 'new dogs require unique breed, country of origin, and average weight'})
    } else {
        req.dog = {
            breed,
            countryOrigin,
            avgWeightPounds
        }
        next()
    }
}
async function checkBreedUnique(req, res, next) {
    const { breed } = req.body
    const dog = await db('dogs').where('breed', breed).first()
    if(dog === undefined) {
        next()
    } else {
        next({status: 400, message: 'dog breed must be unique'})
    }
}
async function checkIdValid(req, res, next) {
    const dog = await db('dogs').where('id', req.params.id).first()
    if(!dog) {
        next({status: 404, message: `dog with id ${req.params.id} not found`})
    } else {
        next()
    }
}
module.exports = {
    checkBreedUnique,
    checkDogObjectComplete,
    checkIdValid
}
