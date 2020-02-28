const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find, 
    findById,
    remove
};

function find() {
    return db('users').select('id', 'username', 'password');
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function remove(id) {
    return db('users')
    .where('id', id)
    .del();
}
