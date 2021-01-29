const db = require('../../data/config');

module.exports = {
    find,
    findById,
    create,
    remove
}

function find() {
    return db('quotes');
}

function findById(id) {
    return db('quotes').where({ id }).first();
}

async function create(quote) {
    const [id] = await db('quotes').insert(quote);
    return findById(id);
}

function remove(id) {
    return db('quotes').where({ id }).del();
}
