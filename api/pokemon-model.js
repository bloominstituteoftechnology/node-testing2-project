const db = require('../data/db-config')

const addmon = pokemon => {
    return db("pokemon").insert(pokemon)
}

const delmon = pokemon_id => {
    return db("pokemon").where({pokemon_id}).delete()
}
module.exports = { addmon, delmon }