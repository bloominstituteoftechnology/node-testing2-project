const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getById,
    add,
    remove
};

function getAll() {
    return db('smash');
}

function getById(id){
    return db('smash')
        .where('id', id)
        .first();
}

async function add(character){
    return db('smash')
        .insert(character)
        .then(([id]) => getById(id));
}

async function remove(id){
    const deleted = await getById(id);
    await db('smash').del().where('id', id)
    return deleted;
}