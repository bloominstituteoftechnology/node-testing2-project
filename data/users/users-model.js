const db = require('../../db-config')

async function getAll(){
    return await db('users')
}

async function getById(id){
    return db('users').where('user_id', id).first()
}

async function addUser(user){
    const [id] = await db('users').insert(user)
    return getById(id)
}

async function update(user_id, user){
    await db('users').where({user_id}).update(user)
    return getById(user_id)
}



module.exports= {
    getAll,
    getById,
    addUser,
    update
}