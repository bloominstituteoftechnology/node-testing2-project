// Update with your config settings.

const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' }
}
module.exports = {

  development: {
   ...common,
    connection: {
      filename: './data/students.db3'
    }
  },

  testing: {
    ...common,
    connection: {
      filename: './data/test.db3',
    },
  },
  production: {

  },
};

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

//};
