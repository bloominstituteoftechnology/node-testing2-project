exports.seed = function (knex) {
	// ?? Deletes ALL existing entries
	return knex('books')
		.truncate()
		.then(function () {
			// ?? Inserts seed entries
			return knex('books').insert([
				{ title: 'The Eye of The World' },
				{ title: 'The Great Hunt' },
				{ title: 'The Dragon Reborn' },
			]);
		});
};
