const db = require('../../data/dbConfig')

function getAll() {
    return db('games')
}
function getById(id) {
    return db('games')
        .where('game_id', id)
        .first()
}
async function create(newGame) {
    const [id] = await db('games').insert(newGame)
    return getById(id)
}
async function remove(id) {
    return 'remove wired'
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}