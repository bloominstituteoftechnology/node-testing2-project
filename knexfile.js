// Update with your config settings.

const common = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {directory: "./data/migrations"},
  seeds: {directory: "./data/seeds"}
}

module.exports = {

  development: {
    ...common,
    connection: {
      filename: './data/coastersDev.db3'
    }
  },
  
  testing: {
    ...common,
    connection: {
      filname: './data/coastersTest.db3'
    }

  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
