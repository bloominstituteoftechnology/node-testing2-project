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
    return db('crossfitters')
    .update(changes)
    .where('id', id)
    .then(() => getById(id))
}

async function remove (id) {
    const res = await getById(id)
    await db('crossfitters').del().where('id', id)
    return res
}