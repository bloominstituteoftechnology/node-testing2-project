## Install JEST

https://jestjs.io/

[] npm install --save-dev jest

## Install Suptertest

https://github.com/visionmedia/supertest

[] npm install supertest --save-dev

## May need to run npm audit fix

[] npm audit fix

## Install Knex

https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977

[] npm install knex --save

## Create Knexfile.js

[] knex init

Insert this:

        const common = {
        client: 'sqlite3',
        useNullAsDefault: true,
        migrations: { directory: './data/migrations' },
        seeds: { directory: './data/seeds' },
        }

        module.exports = {
        development: { // process.env.DB_ENV || 'development'
            ...common,
            connection: {
            filename: './data/hobbits.db3',
            },
        },
        testing: { // process.env.DB_ENV 'testing'
            ...common,
            connection: {
            filename: './data/test.db3',
            },
        },
        production: {

        },
        };

## Install SQL3

https://www.npmjs.com/package/sqlite3

[] npm install sqlite3



## Run project

[ ] move inside the project folder.
[ ] type `npm i` to download dependencies.
[ ] type `npm run migrate` to run migrations.
[ ] type `npm run seed` to seed the db.
[ ] type `npm run server` to start the API.
