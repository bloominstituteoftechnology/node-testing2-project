const db = require('../../data/db-config');

function findById(id) {
    return `findById(${id}) db operation under construction`
}

function findAll() {
    return 'findAll db operation under construction'
}

function findByMake(carMake) {
    return `findByMake(${carMake}) db operation under construction`
}

function insertCar(car) {
    return `insertCar(${car}) db operation under construction`
}

function deleteCar(id) {
    return`deleteCar(${id}) db operation under construction`
}

module.exports = {
    findById,
    findAll,
    findByMake,
    insertCar,
    deleteCar,
}