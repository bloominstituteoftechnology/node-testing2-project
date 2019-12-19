const db = require('../dataBase/dbConfig')



function insert(user) {
    return db('employee')
        .insert(user, 'id')
        .then(ids => {
            const id = ids[0]
            return db('employee')
                .where({ id })
                .first()
        })
}

function get() {
    return db('employee')
}

function remove(id) {
    return db('uesrs')
    .where('id', id)
    .del();
}