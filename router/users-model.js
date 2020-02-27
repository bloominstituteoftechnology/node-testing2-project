const db = require("../data/dbConfig.js")

module.exports = {
    insert, 
    remove,
    getAll,
};

function insert(user) {
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return db("users")
                .where({ id})
                .first() 
        })
}

function remove(id) {
    return db("users")
        .where("id", id)
        .del();
}

function getAll() {
    return db("users");
}