const db = require('../../data/dbConfig');

// ?? Add a book to the database
async function insert(book) {
	return await db('books').insert(book);
}

// ?? Remove a book from the database
async function remove(id) {
	return await db('books').del().where({ id });
}

module.exports = { insert, remove };
