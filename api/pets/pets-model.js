const db = require('../../data/dbConfig')

module.exports = {
    insert,
    update,
    getAll,
    getById
}

async function insert(pet) {
    const [id] = await db('pets').insert(pet)
    return db('pets').where({id}).first()
}


async function update(id, changes) {
    await db('pets').where({id}).update(changes)
    return db('pets').where({id}).first();
}

function getAll(){
    return db('pets')
}

function getById(id){
    return db('pets').where({id}).first()
}
