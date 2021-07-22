const db = require('../../data/dbConfig')

function getAll() {
    return db('games')
}
function getById(id) {
    return db('games')
        .where('game_id', id)
}
function create() {
    return 'create wired'
}
function remove(id) {
    return 'remove wired'
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}