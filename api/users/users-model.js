const db = require('../../data/dbConfig')

function find() {
    return db('users')
    .join('roles', 'users.role_id', 'roles.role_id')
    .select('user_id', 'username', 'role_name')
}


module.exports = {
    find, 
}