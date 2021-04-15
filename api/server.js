const express = require('express');
const Books = require('./books/books-model');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ api: 'up' });
});

server.post('/books', async (req, res) => {
	const newBook = await Books.insert(req.body);
	// console.log(newBook);
	res.status(201).json(newBook);
});

server.delete('/books/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Books.remove(id);
		if (book) {
			res.status(200).json({
				message: `Book ${book} deleted successfully`,
			});
		} else {
			res.status(404).json({
				message: `The book with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'The book could not be removed',
		});
	}
});

module.exports = server;
