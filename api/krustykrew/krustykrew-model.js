const db = require('../../data/dbConfig.js')

module.exports = {
    insert,
    update,
    remove,
    getAll,
    getById,
}

function getAll(){
    return db('krustykrew')
}

function getById(id){
    return db('krustykrew').where({id})
    .first()
}

async function insert(krustykrew){
    return db('krustykrew').insert(krustykrew)
    .then(([id]) => {
        return getById(id)
    })
}

async function update(id, changes){
    return null
}

function remove(id){
    return null
}