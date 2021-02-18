const db = require('../data/dbConfig');

module.exports = {
    insert,
    getBy,
    get,
    remove
}

async function get (filter){
    return await db.select('*').from('users').where(filter);
}

async function insert(user){
    const {username} = user
         await db.insert(user).into('users');
    return await db.select('*').from('users').where({username})
};

async function getBy(filter){
    return await db('users').where(filter).orderBy('id');
}

async function remove(user){
    return await db('users').where(user).del();
}