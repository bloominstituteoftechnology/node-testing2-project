const Books = require('./books-model');
const db = require('../../data/dbConfig');

// ?? beforeAll tests, rollback(), latest() migrations
beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

// ?? beforeEach test, truncate() database
beforeEach(async () => {
	await db('books').truncate();
});

// ?? afterAll tests, destroy() database
afterAll(async () => {
	await db.destroy();
});

// ?? books-model batch of tests
describe('books-model', () => {
	// ?? insert() batch of tests
	describe('insert()', () => {
		test('inserts book into database', async () => {
			await Books.insert({
				title: 'The Shadow Rising',
			});
			await Books.insert({
				title: 'The Fires of Heaven',
			});

			const books = await db('books');
			expect(books).toHaveLength(2);
		});
		test('database contains expected data', async () => {
			await Books.insert({
				title: 'The Dragon Reborn',
			});

			const expected = [
				{
					id: 1,
					title: 'The Dragon Reborn',
				},
			];
			const books = await db('books');
			expect(books).toEqual(expected);
		});
	});

	// ?? Remove batch of tests
	describe('remove()', () => {
		test('removes book from database', async () => {
			await Books.insert({ title: 'Lord of Chaos' });

			let books = await db('books');
			expect(books).toHaveLength(1);

			await Books.remove(1);
			books = await db('books');
			expect(books).toHaveLength(0);
		});
		test('database does not contain deleted data', async () => {
			await Books.insert({
				title: 'A Crown of Swords',
			});
			await Books.insert({
				title: 'The Path of Daggers',
			});

			const expected = {
				id: 1,
				title: 'A Crown of Swords',
			};
			let books = await db('books');
			expect(books).toContainEqual(expected);

			await Books.remove(1);
			books = await db('books');
			expect(books).not.toContainEqual(expected);
		});
	});
});
