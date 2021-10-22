const db = require('../../../data/db-config');

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
};

function getAll() {
    return db('pets');
}

function getById(id) {
    return db('pets')
        .where('pet_id', id)
        .first();
}

async function insert(pet) {
    return await db('pets')
        .insert(pet)
        .then(([id]) => {
            return getById(id);
        });
}

function update(id, changes) {
    return db('pets')
        .where({ pet_id: id })
        .update(changes)
        .then(rows => {
            return getById(id);
        });
}

async function remove(id) {
    const removed = await db('pets').where('pet_id', id).first();
    await db('pets').del().where('pet_id', id);
    return removed;
}