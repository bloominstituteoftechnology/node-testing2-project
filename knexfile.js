const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './migrations' },
  seeds: { directory: './seeds' },
}

module.exports = {
  development: {
    ...common,
    connection: {
      filename: './sample.db3',
    },
  },
  testing: {
    ...common,
    connection: {
      filename: './test.db3',
    },
  },
  production: {

  },
};
