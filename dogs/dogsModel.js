const db = require('../data/dbConfig');

module.exports = {
    insert,
    remove
}

async function insert(dog) {
    const [id] = await db('dogs').insert(dog, 'id');
    return db('dogs').where({id}).first(); // allows to check for specific dog
}

async function remove(dog) {
    const [id] = await db('dogs').remove(dog, 'id');
    return db('dogs').where({id}).first(); // same code, endpoint creates different behavior
}