// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./pcparts/data/pcparts.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./pcparts/data/migrations"
    },
    seeds: {
      directory: "./pcparts/data/seeds/"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./pcparts/data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./pcparts/data/migrations/"
    },
    seeds: {
      directory: "./pcparts/data/seeds/"
    }
  },
};
