const db = require('../database/db-config')

module.exports = {
    get,
    findById,
    insert,
    remove,
}

function get(){
    return db("users")
}

function findById(id){
    return db("users")
    .where({id})
    .first()
}

function insert(user){
    return db("users")
    .insert(user)
    .where({id:user.id})
}

function remove(id){
    return db("users")
    .del()
    .where({id})
}