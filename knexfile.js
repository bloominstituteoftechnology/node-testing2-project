const baseTemplate = {
  client: 'sqlite3',
  useNullAsDefault:true,
  connection: {
    filename: './data/test.db'
  },
  migrations: {
    directory: './data/migrations'
  },
  seeds:{
    directory: './data/seeds'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    },
  }
}

module.exports = {
  development: {...baseTemplate},
  testing: {...baseTemplate}
};
