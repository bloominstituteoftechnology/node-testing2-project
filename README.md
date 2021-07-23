# Server Testing Module Project

## Instructions

### Task 1: Set Up The Project With Git

Follow these steps to set up and work on your project:

- [x] Create a forked copy of this project.
- [x] Clone your OWN version of the repository (Not Lambda's by mistake!).
- [x] Create a new branch: git checkout -b `<firstName-lastName>`.
- [x] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [x] Push commits: git push -u origin `<firstName-lastName>`.

### Task 2: Minimum Viable Product

For this project you will use `Test Driven Development` to create a RESTful API using `Node.js` and `Express` that publishes a set of endpoints to manage a _resource_ of your choosing. Data can be stored in memory, adding a **test database is optional**.

## Requirements

- use `jest` and `supertest` to write the tests.
- Your API must be able to **create** and **delete** a _resource_ of your choosing.
- Write a minimum of two tests per route handler.

### Task 3: Stretch Goals

The following goals are designed to stretch your knowledge and may require additional research beyond what was learned in class today.

- [ ] Add endpoints for viewing the details of the resource. Write tests for it.
- [ ] Add a testing database to the project and configure the testing script inside `package.json` to use the testing database. Hint: use `cross-env` npm package.
- [ ] Complete the rest of the CRUD operations and write tests for them.
- [ ] Add tests for your data access files (models).

## Submission format

Follow these steps for completing your project.

- [ ] Submit a pull request to merge <firstName-lastName> Branch into master (student's  Repo). **Please don't merge your own pull request**
