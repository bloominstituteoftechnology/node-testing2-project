module.exports = {

  development: {
    client: 'sqlite3',
    // connection: {
    //   // filename: './data',
    // },
    useNullAsDefault: null,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    
    },
  },

  production: {

  },

};