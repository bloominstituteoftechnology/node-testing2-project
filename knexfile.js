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
        filename: './data/cats.db3',
      },
    },
    test: {
      ...common,
      connection: {
        filename: './data/test.db3',
      },
    },
    production: {
  
    },
  };
  