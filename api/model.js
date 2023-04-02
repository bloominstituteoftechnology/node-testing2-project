const db = require("../data/dbConfig")

exports.get = (filter) => {
    if(!filter) 
        return db("coasters");
    return db("coasters").where(filter);
}