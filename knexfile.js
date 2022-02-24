const info = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
    ...info,
    connection: {
      filename: './data/profile.db3',
    },
  },
  testing: {
    ...info,
    connection: {
      filename: './data/test.db3',
    },
  },
  production: {

  }
}