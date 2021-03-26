// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite3'
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
