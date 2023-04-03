const db = require("../data/dbConfig")

let funcObj = {};

exports.get = function() {
    return db("coasters");
}

exports.getBy = function(filter) {
    return db("coasters").where(filter).first();
}

exports.add = async function(newCoaster) {
    const [coaster_id] = await db("coasters").insert(newCoaster);
    return exports.getBy({coaster_id});
}

exports.del = async function(id) {
    const filter = { coaster_id: id };
    const coasterToBeDeleted = await exports.getBy(filter);
    await db("coasters").where(filter).del();
    return coasterToBeDeleted;
}