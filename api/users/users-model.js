const db = require('../../data/db-config')

module.exports = {
	insert,
	update,
	remove,
	getAll,
	getById,
  }
  
  function getAll() {
	return db('users')
  }
  
  function getById(id) {
	return db('users').where('id', id).first();
  }
  
  async function insert(users) {
	const [id] = await db('users').insert(users);
	return getById(id)
  }
  
  async function update(id, changes) {
	return null
  }
  
  function remove(id) {
	return null
  }