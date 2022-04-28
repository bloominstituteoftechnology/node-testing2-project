module.exports = {
    development: {
      ...sharedConfig,
      connection: { filename: './data/auth.db3' },
    },
    testing: {
      ...sharedConfig,
      connection: { filename: './data/testing.db3' },
    },
  }