const db = require('../../data/dbConfig')

function getAll() {
    return db('pokemon')
}

const getById = (id) => {
    return db('pokemon').where('id', id).first()
}

const create = async (pokemon) => {
    const [id] = await db('pokemon').insert(pokemon)
    return db('pokemon').where({ id }).first()
}

const remove = async (id) => {
    const deleted = await db('pokemon').where('id', id).del()
    return deleted[0]
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}