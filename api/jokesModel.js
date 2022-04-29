const db = require('../data/dbConfig.js');

async function createJoke(joke) {
    const [id] = await db('jokes').insert(joke);
    return db('jokes').where("joke_id", id).first();
}
async function deleteJoke(joke_id) {
    const joke = await db('jokes').where({ joke_id }).first();
    if (joke) {
        await db('jokes').where({ joke_id }).del();
        return joke;
    }
}
async function updateJoke(joke_id, changes) {
    const joke = await db('jokes').where({ joke_id }).first();
    if (joke) {
        await db('jokes').where({ joke_id }).update(changes);
        return db('jokes').where({ joke_id }).first();
    }
}
async function readJokes() {
    return await db('jokes');
}
async function readJokesById(joke_id) {
    return await db('jokes').where({ joke_id }).first();
}
module.exports = {
    createJoke,
    deleteJoke,
    updateJoke,
    readJokes,
    readJokesById
}