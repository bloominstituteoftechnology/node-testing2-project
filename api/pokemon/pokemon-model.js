const db = require('../../data/dbConfig')

module.exports = {
    get,
    insert,
    remove
}

async function get(){
    return db('pokemon')
}

async function insert(pokemon){
    const [id] = await db('pokemon')
    .insert(pokemon)
    return db('pokemon').where({id}).first()
}

function remove(id){
    const pokemon = db('pokemon').where({id}).first()

    if(!pokemon){
        return Promise.resolve(null)
    } else{
        return db('pokemon').where('id', id).del()
    }
}