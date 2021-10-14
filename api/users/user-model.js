const db = require('../../data/db-config');



const getAll = () => {
    return db('users')
}
const getByName = (name) => {
    const user = db('users').where('name', name).first();
    return user
}
const insert = async (user) => {
    const [id] = await db('users').insert(user)

    return await db('users').where('id', id).first()
}
const update = () => {

}

const remove = async (id) => {
    const user = db('users').where('id', id)
    await db('users').where({ id: id }).del()
    return user
}

module.exports = {
    getAll,
    getByName,
    insert,
    update,
    remove,
}


