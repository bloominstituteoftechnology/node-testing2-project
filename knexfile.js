module.exports = {
    //npx knex migrate:latest
    development:{
        client:'sqlite3',
        useNullAsDefault:true,
        connection:{
            filename:'./data/cars.db3'
        },
        migrations:{
            directory:'./data/migrations'
        },
        seeds:{
            directory:'./data/seeds'
        }

    },
    //npx knex migrate:latest --env=testing
    testing:{
        client:'sqlite3',
        useNullAsDefault:true,
        connection:{
            filename:'./data/test.db3'
        },
        migrations:{
            directory:'./data/migrations'
        },
        seeds:{
            directory:'./data/seeds'
        },

    }
};