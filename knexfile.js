const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: { // process.env.DB_ENV || 'development'
    ...common,
    connection: {
      filename: './data/krustykrew.db3',
    },
  },
  testing: { // process.env.DB_ENV 'testing'
    ...common,
    connection: {
      filename: './data/test.db3',
    },
  },
  production: {

  },
};
