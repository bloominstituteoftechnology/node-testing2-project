const db = require('../data/config')

function find() {
    return db('vampires')
}

module.exports = {
    find,
}