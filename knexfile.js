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
        filename: '',
      },
    },
    testing: {
      ...common,
      connection: {
        filename: '',
      },
    },
    production: {
  
    },
  };