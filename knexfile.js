// Update the following configurations according to your database setup

module.exports = {
    development: {
      client: 'sqlite3', // or 'pg', 'mysql', etc.
      connection: {
        filename: './dev.sqlite3' // or your development database path
      },
      useNullAsDefault: true,
      migrations: {
        directory: './src/db/migrations'
      },
      seeds: {
        directory: './src/db/seeds'
      }
    },
  
    testing: {
      client: 'sqlite3', // or your preferred client for testing
      connection: {
        filename: ':memory:' // In-memory database for testing
      },
      useNullAsDefault: true,
      migrations: {
        directory: './src/db/migrations'
      },
      seeds: {
        directory: './src/db/seeds'
      }
    },
  
    // You can add more configurations for other environments like 'production'
  };
  