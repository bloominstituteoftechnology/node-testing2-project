const db = require('../../data/db-config')

function getAll(){
    return db('characters')
}

function getById(id){
    return db('characters')
    .where({ id: Number(id) })
    .first()
}

async function insert(character){
    const [ id ] = await db('characters').insert(character)
    return getById(id)
}

module.exports = {
    getAll, 
    getById,
    insert
}