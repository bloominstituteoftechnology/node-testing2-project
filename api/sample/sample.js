const db = require('../../dbConfig')

module.exports = {
    getAll,
    getById,
    insert,
    remove
}

function getAll(){
    return db('sample')
}

function getById(id){
    return db('sample').where('id', id).first()
}

function insert(dog){
    return db('sample').insert(dog)
        .then(([id]) => {
            return getById(id)
        })
}

function remove(id){
    return null
        // db('sample').remove(id)
}
