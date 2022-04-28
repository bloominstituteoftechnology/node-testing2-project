const common = {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  }
  
  module.exports = {
    development: {
      ...common,
      connection: {
        filename: './data/crossfitters.db3',
      },
    },
    testing: {
      ...common,
      connection: {
        filename: './data/crossfitters.db3',
      },
    },
    production: {
  
    },
  };
  