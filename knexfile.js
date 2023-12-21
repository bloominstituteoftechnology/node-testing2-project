module.exports = {
    development: {
        client: 'sqlite',
        useNullAsDefault: true,
        connection: {
            filename: './data/pokemon.db3'
        },
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },
    testing: {
        client: 'sqlite',
        useNullAsDefault: true,
        connection: {
            filename: './data/test.db3'
        },
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    }
}