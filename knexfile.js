const information = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
    ...information,
    connection: {
      filename: './data/profile.db3',
    },
  },
  testing: {
    ...information,
    connection: {
      filename: './data/test.db3',
    },
  },
  production: {

  }
}