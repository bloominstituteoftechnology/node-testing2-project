const db = require('../data/dbConfig');

module.exports = {
    insert,
    remove
}

async function insert(dog) {
    const [id] = await db('dogs').insert(dog, 'id');
    return db('dogs').where({id}).first(); // allows to check for specific dog
}

function remove(id) {
    return db('dogs').where('id', Number(id)).delete();
}