// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/packages",
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
    connection: "postgres://localhost/packages_testing",
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
