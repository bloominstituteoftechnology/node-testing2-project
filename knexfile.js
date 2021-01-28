module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
    connection: {
      filename: "./data/memes.db3",
    },
  },
  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
    connection: {
      filename: "./data/test.db3",
    },
  },
};
