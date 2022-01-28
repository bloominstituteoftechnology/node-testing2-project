const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
  pool: { afterCreate: (conn, done) => { conn.run('PRAGMA foreign_keys = ON', done) }, },
}

module.exports = {
  development: {
    ...common,
    connection: {
      filename: './data/dev.db3',
    },
  },
  testing: {
    ...common,
    connection: {
      filename: './data/test.db3',
    },
  },
  production: {

  },
};