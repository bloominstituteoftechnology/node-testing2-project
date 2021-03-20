// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './data/shelbies.db3'
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},

	testing: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './data/shelbies-test.db3'
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	}
};
