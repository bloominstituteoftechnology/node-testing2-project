const db = require('../../data/dbConfig');

// ?? Get list of books
const getAll = async () => {
	return await db('books');
};

// ?? Get book with specified ID
const getById = (id) => {
	const book = db.first('*').from('books').where({ id });
	return book;
};

// ?? Add a book to the database
async function insert(book) {
	return await db('books').insert(book);
}

// ?? Remove a book from the database
async function remove(id) {
	return await db('books').del().where({ id });
}

module.exports = { getAll, getById, insert, remove };
