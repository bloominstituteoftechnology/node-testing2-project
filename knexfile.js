// Update with your config settings.
const pgConnection = process.env.DATABASE_URL;

module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		migrations: { directory: './data/migrations' },
		seeds: { directory: './data/seeds' },
		connection: {
			filename: './data/wot-books.db3',
		},
	},

	testing: {
		client: 'sqlite3',
		useNullAsDefault: true,
		migrations: { directory: './data/migrations' },
		seeds: { directory: './data/seeds' },
		connection: {
			filename: './data/test.db3',
		},
	},

	production: {
		client: 'pg',
		connection: {
			connectionString: pgConnection,
			ssl: { rejectUnauthorized: false },
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},
};
