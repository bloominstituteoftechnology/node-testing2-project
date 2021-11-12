const db = require('../../data/db-config')

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
}

function getAll() {
  return db('starks')
}

function getById(id) {
  return db('starks').where('id', id).first()
}

function insert() {

}

function update() {

}

function remove() {

}
