require("dotenv").config();

// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "packages",
      port: 5555,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  },

  testing: {
    client: "pg",
    connection: {
      database: "packages_testing",
      port: 5555,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/test"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/production"
    },
    useNullAsDefault: true
  }
};
