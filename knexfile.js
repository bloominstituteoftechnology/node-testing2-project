const sharedConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done), },
    seeds: { directory: './data/seeds'}
}

module.exports= {
    development: {
        ...sharedConfig,
        connection: { filename: './data/quotes.db3' },
    },

    testing: {
        ...sharedConfig,
        connection: { filename: './data/quotes.test.db3'}
    },
    production: {}
}

