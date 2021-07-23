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
    const [id] = await db('games')
        .insert(newGame)
    return getById(id)
}
async function remove(id) {
    const gameToBeDeleted =  await getById(id)
    await db('games')
        .where('game_id', id)
        .del()
    return gameToBeDeleted
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}