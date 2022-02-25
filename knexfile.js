
const knexfile = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
};

module.exports = {

  development: {
    ...knexfile,
    connection: {
      filename: './data/streamers.db3'
    }
  },

  testing: {
    ...knexfile,
    connection: {
      filename: './data/test.db3'
    }
  }

};