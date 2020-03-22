const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

async function add(user) {
 //user bcrypt to hash the password with a time complexity of 14
 user.password = await bcrypt.hash(user.password, 14)
 const [id] = await db("users").insert(user)

 return findById(id)
}

function findById(id) {
    return db("users")
            .select("*")
            .where({id})
            .first()
}

function findUserActions(id) {
        
    return db("actions as a")
        .join("users as u", "u.id", "a.user_id")
        .select("a.id","a.action_name", "a.action_type", "a.dmg_type", "a.dice_amt", "a.dice","a.to_hit_mod", "a.dmg_mod", "a.user_id")
        .where("a.user_id", id)
           
}

async function addAction(action, user_id) {
    const newAction = {...action, user_id}
    return await db('actions')
        .insert(newAction)
}



function find() {
    return db("users")
    .select("id", 'char_name', "race", "class", "str_mod")
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password", "char_name")
        .where(filter)
}



module.exports = {
    add,
    find,
    findBy,
    findById,
    findUserActions,
    addAction,
   
}