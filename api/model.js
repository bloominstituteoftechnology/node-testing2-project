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

const findBy = (filter) => {
    return(
        db('babyNames').where(filter)
    )
}

const addName = async (nameObject) => {
        await db('babyNames').insert(nameObject)

        return db('babyNames').where('name', nameObject.name)
}

module.exports = {
    findAll,
    findByGender,
    addName,
    findBy
}