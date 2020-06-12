const db = require('../data/dbConfig.js')

module.exports = {
    getUser,
    addUser

};

function getUser() {
    return db('users').select('id as ID', 'username as User Name:').orderBy('id');
}

function addUser(user) {
    return db('users').insert(user)
}
