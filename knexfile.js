module.exports = {
	development: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./database/auth.db3"
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			}
		},
		migrations: {
			directory: "./database/migrations"
		},
		seeds: {
			directory: "./database/seeds"
		}
	},
	testing: {
		client: "sqlite3",
		connection: {
			filename: "./database/test.db3"
		},
		useNullAsDefault: true,
		migrations: {
			directory: "./database/migrations"
		},
		seeds: {
			directory: "./database/seeds"
		}
	}
};
