const db = require('../../data/dbConfig')

function get() {
  return db('models')
}

function findById(id) {
  return db('models')
    .where('id', id)
    .first();

}


async function add(car) {
  const [id] = await db('models').insert(car);
  return findById(id);
}

async function modify(id, changes) {
  return db('models').where("id", id).update(changes)
}

const remove = (id) => {
  return db('models').where("id", id).del();
}

module.exports = {
  add,
  get,
  findById,
  modify,
  remove
};