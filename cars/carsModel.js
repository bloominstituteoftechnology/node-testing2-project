const db = require('../data/db.config');

module.exports = {
    insert,
    remove,
    find,
    findById
}

async function insert(car) {
    const [id] = await db('cars').insert(car, 'id');
    return db('cars').where({ id }).first();
};

function remove(id) {
    return db('cars').where('id', Number(id).delete());
}

function find() {
    return db('cars');
}

function findById(id) {
    return db('cars').where({ id }).first()
}