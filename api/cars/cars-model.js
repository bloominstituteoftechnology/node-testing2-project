const db = require('../../data/db-config');

module.exports = {
    findById,
    findAll,
    findByMake,
    updateCar,
    insertCar,
    deleteCar,
}

function findById(id) {
    return db('cars').where('id', id).first()
}

function findAll() {
    return db('cars')
}

function findByMake(carMake) {
    return db('cars').where('make', carMake)
}

async function insertCar(car) {
    const newCarId = await db('cars').insert(car)
    return findById(newCarId);
}

function updateCar(id, updates) {
    return `updateCar (${id}, ${updates}) db operation under construction)`
}

function deleteCar(id) {
    return`deleteCar(${id}) db operation under construction`
}