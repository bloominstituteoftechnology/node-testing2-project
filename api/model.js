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
    return null
}

function insert (crossfitter) {
    return null
}

function update (id, changes) {
    return null
}

function remove (id) {
    return null
}