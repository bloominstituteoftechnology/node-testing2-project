const db = require('../data/config')

function find() {
    return db('vampires')
}

function findById(id) {
    return db('vampires').where({id}).first()
}

async function create(data) {
    const [id] = await db('vampires').insert(data)
    return findById(id)
}

function remove(id) {
    return db('vampires').where({id}).del()
}

module.exports = {
    find,
    findById,
    create,
    remove
}