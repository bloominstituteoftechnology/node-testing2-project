const db = require('../data/db-config')

module.exports = {
    insert,
    update,
    remove,
    getAll,
    getById,
}

function getAll () {
    return db('crossfitters')
}

function getById (id) {
    return db('crossfitters')
    .where('id', id)
    .first()
}

function insert (crossfitter) {
    return db('crossfitters')
    .insert(crossfitter)
    .then(([id]) => getById(id))
}

function update (id, changes) {
    return null
}

function remove (id) {
    return null
}