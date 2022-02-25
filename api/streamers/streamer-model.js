const db = require('../../data/dbConfig')


 const findAll = () => {
  return db('streamers')
}

const find = (id) => {
    return db('streamers').where('streamer_id', id).first()
}
const create = (streamer) => {
    return db('streamers').insert(streamer).then(([id]) => {
        return find(id)
    })
}

module.exports = {
    findAll,
    find,
    create
}