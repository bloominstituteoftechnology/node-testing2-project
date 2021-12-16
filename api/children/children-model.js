const db = require('../../data/db-config')

module.exports = {
    getAll,
    getByID,
    make
}

function getAll(){
    return db('children')
}

function getByID(){

}

async function make(){

}