// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/maindb.db3'
    },
    migrations : {
      directory : "./database/migrations"
    },
    seeds : {
      directory : "./database/seeds",
    },
    pool : {
      afterCreate : (conn,done) => {
        conn.run("PRAGMA foreign_key = ON",done)
      }
    },
    useNullAsDefault : true,
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/testdb.db3'
    },
    migrations : {
      directory : "./database/migrations"
    },
    seeds : {
      directory : "./database/seeds",
    },
    pool : {
      afterCreate : (conn,done) => {
        conn.run("PRAGMA foreign_key = ON",done)
      }
    },
    useNullAsDefault : true,
  },

};
