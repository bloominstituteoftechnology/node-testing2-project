# Server-Testing

## Topics

* unit testing.
* integration testing.
* TDD/BDD
* jest testing framework.
* supertest module.

## Assignment

For this project you will use `Test Driven Development` to create a RESTful API using Node.js, Express and Mongoose that stores data in a MongoDB database.

We will also add integration tests that will use a test database to make sure that the API is persisting and removing the correct data.

## Download Project and Run the Tests

1.  fork and clone this repository.
1.  **CD into the folder** where you downloaded the repository.
1.  run `yarn` or `npm i` to download all dependencies.

## Requirements

1.  use `jest` and `supertest` to write the tests.
1.  add a `test` script to `package.json` to run the tests using `yarn test` or `npm test`.
1.  Your API must have be able to **create** and **delete** a resource of your choosing.
1.  Add logic on the route handlers to validate request data and return the correct HTTP status code.
1.  write a minimum of two test for each route.
1.  Add tests to verify validation works as intended.
1.  Add tests to verify that the endpoint returns the correct HTTP status code.
1.  Write the **tests BEFORE** writing the route handlers.
1.  The `integration tests` can be written after the model is created.
1.  Your `mongoose model` should have at least a `method` or `static` that is tested.
