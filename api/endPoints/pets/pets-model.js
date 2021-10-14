const db = require('../data/dbconfig');

module.exports = {
    getAll,
    getById,
    insert,
    remove
};

function getAll() {
    return db('pets');
}

function getById(id) {
    return db('pets').where('pet_id', id).first();
}

async function insert(pet) {
    return await db('pets').insert(pet).then(([id]) => {
        return getById(id);
    });
}

async function remove(id) {
    const removed = await db('pets').where('pet_id', id).first();
    await db('pets').del().where('pet_id', id);
    return removed;
}