const db = require('../../data/dbConfig.js')

async function createMember (member) {
    const [id] = await db('tests').insert(member)
    return db('tests').where('test_id',id).first()
}
async function delMember (id) {
    return db('tests').where('test_id',id).del()
}

module.exports = {createMember, delMember}
