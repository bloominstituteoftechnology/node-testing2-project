# Server-Testing

## Topics

* unit testing.
* integration testing.
* TDD/BDD.
* jest testing framework.
* supertest module.

## Assignment

For this project you will use `Test Driven Development` to create a RESTful API using Node.js and Express and Mongoose that publishes a set of endpoints to manage a resource of our choosing. Data can be store in memory.

## Download Project and Install Dependencies

1.  fork and clone this repository.
1.  **CD into the folder** where you downloaded the repository.
1.  run `yarn` or `npm i` to download all dependencies.
1.  type `yarn test` or `npm test` to run the tests. The `test` script is already configured.

## Requirements

1.  use `jest` and `supertest` to write the tests.
1.  Your API must be able to **create** and **delete** a `resource` of your choosing.
1.  Write a minimum of two tests per route handler.
1.  Add logic on the route handlers to validate request data and return the correct HTTP status code.
1.  Add tests to verify that the endpoints return the correct HTTP status codes.
1.  Write the **tests BEFORE** writing the route handlers.
