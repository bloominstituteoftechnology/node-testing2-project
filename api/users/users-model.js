const db = require('../../data/dbconfig.js');

function find() {
    return db("users as u")
    .select("u.user_id","u.username", "r.role_name")
    .leftJoin("roles as r", "u.role_id", "r.role_id")
}

function findBy(filter) {
    if (!filter){
        return null
    } else {
        return db("users as u")
        .leftJoin("roles as r", "u.role_id", "r.role_id")
        .where(filter)
        .then(user=>{
            return user
        })
    }
}

function findById(user_id) {
    return db("users as u")
    .select("u.user_id","u.username", "r.role_name")
    .leftJoin("roles as r", "u.role_id", "r.role_id")
    .where("u.user_id", user_id)
    .then(user=>{
        return user[0]
    })
}

function findRole(role_name){
    return db("roles")
    .where({role_name})
    .then(data=>{
        return data[0]
    })
    
}

async function add(user) {
    const role = await findRole(user.role)
    return db("users")
    .insert({username:user.username, password:user.password, role_id:role.role_id})
    .then(ids=>{
        return findById(ids[0])
    })
}

function deleteById(user_id){
    return db('users')
    .where({user_id})
    .del();
}

module.exports = {find, findBy, findById, add, findRole, deleteById}
