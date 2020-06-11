const db = require('../data/dbConfig')

module.exports = {
    get,
    add
}

function get() {
    return db('dogs')
}

function add(dog) {
    return db('dogs').insert(dog)
}