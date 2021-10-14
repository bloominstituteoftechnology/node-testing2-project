const db = require("../../data/dbConfig")

async function createJoke(joke){
    const [id] = await db('jokes').insert(joke)
    return db('jokes').where("joke_id", id).first()
}

function deleteJoke(joke_id){
    return db('jokes').where("joke_id",joke_id).del();
}


module.exports = {createJoke, deleteJoke}