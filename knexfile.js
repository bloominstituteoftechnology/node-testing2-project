
const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
};

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      filename: './data/streamers.db3'
    },
    seeds:
     { directory: './data/seeds' }
    
  },

  testing: {
    ...sharedConfig,
    connection: {
      filename: './data/test.db3'
    }
  }

};