const db = require('../../data/dbConfig')

module.exports = {
    getAll,
    getById,
    insert
}

function getAll() {
   return db('users') 
}

function getById(id) {
   return db('users')
        .where('id', id)
        .first()
}

async function insert(user) {
    const [id] = await db('users').insert(user)
    return db('users')
        .where('id', id)
        .first()
}