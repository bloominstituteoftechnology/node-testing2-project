const db = require('../data/dbConfig.js');

function find() {
    return db('items');
}

module.exports = {
    find,
}
