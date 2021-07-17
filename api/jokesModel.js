const db = require('../data/dbConfig')

async function createJoke(joke) {
    const [id] = await db("jokes").insert(joke)
    return db("jokes").where("joke_id",id).first()
}
async function deleteJoke(id) {
    const joke = await db("jokes").where("joke_id",id).first()// we select it, store it in a variable before we delete it
    await db("jokes").where("joke_id", id).del()// go ahead and delete it
    return joke// and return the deleted
}

module.exports = {
    createJoke,
    deleteJoke
}