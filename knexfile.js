const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/hobbits";

  module.exports = {
   development: {
     client: "sqlite3",
     connection: {
       filename: "./data/data.db3",
     },
     useNullAsDefault: true,
     migrations: {
       directory: "./data/migrations",
     },
     seeds: {
       directory: "./data/seeds",
     },
   },

    production: {
     client: "pg",
     connection: pgConnection,
     pool: {
       min: 2,
       max: 10,
     },
     migrations: {
       directory: "./data/migrations",
     },
     seeds: {
       directory: "./data/seeds",
     },
   },
 };