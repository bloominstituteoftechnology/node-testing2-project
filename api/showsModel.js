const db = require('../data/dbConfig')

async function createShow(show){
    const [id] = await db('shows').insert(show)
    return db('shows').where('show_id',id).first()
}

async function deleteShow(id) {
    const show = await db('shows').where('show_id',id).first()
    await db('shows').where('show_id',id).del()
    return show
}

async function getAll() {
    return await db("shows");
  }
  
  async function getById(id) {
    return await db("shows").where("show_id", id).first();
  }

  async function updatedShow(id, updates) {
    await db("shows").where("show_id", id).update(updates);
    return db("shows").where("show_id", id).first();
  }

module.exports = {
    createShow,
    deleteShow,
    updatedShow,
    getAll,
    getById
}