const db = require('../../data/db-config');



const getAll = () => {
    return db('users')
}
const getByName = (name) => {
    const user = db('users').where('name', name).first();
    return user
}
const insert = () => {

}
const update = () => {

}

const remove = () => {

}

module.exports = {
    getAll,
    getByName,
    insert,
    update,
    remove,
}


