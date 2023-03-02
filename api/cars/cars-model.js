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

async function updateCar(id, updates) {
    await db('cars').where('id', id).update(updates)
    return findById(id)
}

function deleteCar(id) {
    return`deleteCar(${id}) db operation under construction`
}