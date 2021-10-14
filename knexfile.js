// do not make changes to this file
const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/jokes-giver-5000.js" },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: "./data/jokes.db3" },
    seeds: { directory: "./data/seeds-maker-5000" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: "./data/test.db3" },
    seeds: { directory: "./data/seeds-maker-5000" },
  },
};
