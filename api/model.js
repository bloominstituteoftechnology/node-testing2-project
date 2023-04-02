const db = require("../data/dbConfig")

function get() {
    return db("coasters");
}

function getBy(filter) {
    return db("coasters").where(filter).first();
}

async function add(newCoaster) {
    const [coaster_id] = await db("coasters").insert(newCoaster);
    return getBy({coaster_id});
} 

module.exports = {
    get,
    getBy,
    add
}