
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/data_file.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};