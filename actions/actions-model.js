const db = require('../data/dbConfig');


function findActions() {
    return db("actions")
        .select('*');
}

function findById(id) {
    return db("actions")
            .select("*")
            .where({id})
            .first()
}

function removeAction(id) {
    return db("actions as a").where({id}).del()
}

module.exports = {
    findActions,
    findById,
    removeAction

}