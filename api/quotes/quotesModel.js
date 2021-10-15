const db = require('../../data/db-config.js')


module.exports = {
    insert, 
    remove,
    getAll
}


function getAll() {

    return db('quotes')
}

function getById(id) {

    return db('quotes')
    .where("id", id)
    .first()
}

async function insert (quote) {

    const [id] = await  db('quotes').insert(quote)
    return getById(id)
}

function remove(id) {

    return db("quotes").where("id", id).del();
}