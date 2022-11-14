const db = require('../../data/dbConfig')

module.exports = {
    getAll
}

function getAll() {
   return db('users') 
}