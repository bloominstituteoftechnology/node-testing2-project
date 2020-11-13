const db = require('../data/config')

function find() {
    return db('billy')
}
function findById(id) {
    return db('billy')
    .where({id})
    .first()
}

async function create(data) {
    const [id] = await db('billy').insert(data)
    return findById(id)
}

function remove(id) {
    return db('billy')
    .where({id})
    .del()
}

module.exports = {
    find,
    findById,
    create,
    remove
}