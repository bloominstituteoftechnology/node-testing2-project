const db = require('../../data/db-config.js')

function getAll() {
    return db('capitals')
}

function getById(id) {
    return db('capitals').where('id', id).first()
}

async function insert(capital) {
    return await db('capitals').insert(capital).then((id) => {
        return db('capitals').where('id', id).first()
    })
}

module.exports = {
    getAll,
    getById,
    insert
}