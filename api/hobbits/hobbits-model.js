const database = require("../../data/db-config");

function getAll() {
    return database("hobbits");
}

function getById(id) {
    return database("hobbits")
        .where("id", id)
        .first();
}

async function insert(hobbit) {
    return database("hobbits")
        .insert(hobbit)

        .then(([id]) => {
            return getById(id);
        })
}

module.exports = {
    getAll,
    getById,
    insert
}