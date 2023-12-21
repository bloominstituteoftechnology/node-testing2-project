const db = require('../data/dbConfig');

function find() {
    return db('pokemons');
}

function findById(id) {
    return db('pokemons')
    .where({ id }).first();
}

async function add(pokemon) {
    const [id] = await db('pokemons').insert(pokemon);
    return findById(id);
}

module.exports = {
    find,
    findById,
    add
}