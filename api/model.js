const db = require('../data/dbConfig');

const findAll = () => {
    return (
        db('babyNames')
    )
}

const findByGender = (gender) => {
    return (
        db('babyNames')
        .where('gender', gender)
    )
}

module.exports = {
    findAll,
    findByGender
}