# Server Testing Module Project

## Instructions

### Minimum Viable Product

For this project you will create a RESTful API using Node and Express, containing endpoints to perform some CRUD operations on a resource of your choosing. Two or three endpoints are enough. Data should be persisted in a SQLite database.

## Requirements

- Write a minimum of ten tests using supertest.

## Checklist

Here is a checklist of tasks to help you put your project together:

- Generate a `.gitignore` file. - Done
- Install express, knex@0.95.15, sqlite3 as plain dependencies. - Done
- Alternatively install express, knex, @vscode/sqlite3 as plain dependencies. - Done
- Install jest, eslint, nodemon, supertest, cross-env as dev-dependencies. - done
- Configure jest and eslint using `npx <libname> --init`. - done
- Create a `knexfile.js` with "development" and "testing" configurations. - Done
- Create a `db-config.js` file that selects the correct configuration using the value of `process.env.NODE_ENV`. - Done
- Create migration and seed files.
- Put together "start", "server", "rollback", "migrate" and "seed" scripts in your `package.json`. - Done
- Create a "test" script in your `package.json` using cross-env to inject a `NODE_ENV` of "testing". - Done
- Create a basic express application with a few database access functions and a few endpoints. - Done
- Test your endpoints manually using Postman, HTTPie or similar.
- Test your endpoints with supertest.
