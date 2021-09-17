const db = require('../../data/dbConfig')

function getAll() {
    return db('waxed_products')
}

function getById(id) {
    return db('waxed_products').where('id', id).first()
}

async function insert(product) {
    const [id] = await db('waxed_products').insert(product)
    return getById(id)
}

async function remove(id) {
    const deletedId = await db('waxed_products').where('id', id).del()
    return deletedId
}

module.exports = {
    getAll,
    getById,
    insert,
    remove
}
