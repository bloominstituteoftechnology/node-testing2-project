const db = require("../data/dbConfig")

exports.get = () => {
    return db("coasters");
}

exports.getBy = filter => {
    return db("coasters").where(filter).first();
}