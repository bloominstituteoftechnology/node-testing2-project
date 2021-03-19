const db = require("../data/config")

function addJoke(joke) {
    return db("Jokes").insert(joke)
} 

function deleteJoke(joke_id) {
    return db("Jokes").where({id: joke_id}).del()
}

module.exports = {
    addJoke,
    deleteJoke
}