const db = require('../../data/dbConfig.js')

module.exports = {
    getAll,
    getById,
    insert
}

function getAll() {
    return db('users')
}

function getById(id) {
    return db('users').where('id', id).first()
}

async function insert(user) {
    return db('users').insert(user)
        .then(([id]) => {
            return getById(id)
        })
}