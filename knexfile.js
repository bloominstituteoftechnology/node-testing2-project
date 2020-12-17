// // Update with your config settings.

const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      filename: "./data/authors.db3",
    },
  },
  testing: {
    ...sharedConfig,
    connection: {
      filename: "./data/test.db3",
    },
  },
};


// const pgConnection = ''
// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './data/testing.db3'
//     },
//     useNullAsDefault:true,
//     migrations: {
//       directory:'./data/migrations'
//     },
//     seed: {
//       directory: './data/seeds'
//     }
//   },
    
//   testing: {
//     client: 'sqlite3',
//     connection: {
//      filename: './data/test.db3'
//     },useNullAsDefault: true,
//     migrations: {
//       directory: './data/migrations',
//     },
//     seeds: {
//       directory: './data/seeds',
//     },
//   },
//   production: {
//     client: 'pg',
//     connection: pgConnection,
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: './data/migrations',
//     },
//     seeds: {
//       directory: './data/seeds',
//     },
//   },
// };