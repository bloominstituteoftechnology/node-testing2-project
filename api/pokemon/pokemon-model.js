const db = require('../../data/dbConfig')

module.exports = {
    insert,
    remove
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