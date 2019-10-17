const db = require('../data/dbConfig');

module.exports = {
    insert,
    remove, 
    find,
    findById
}

async function insert(dog) {
    const [id] = await db('dogs').insert(dog, 'id');
    return db('dogs').where({id}).first(); // allows to check for specific dog
};

function remove(id) {
    return db('dogs').where('id', Number(id)).delete();
};

function find() {
    return db('dogs');
}

function findById(id) {
    return db('dogs').where({ id }).first()
};