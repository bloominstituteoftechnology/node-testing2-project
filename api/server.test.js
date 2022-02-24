const bestBooksModel = require('./best-books-model');
const db = require('../data/db-config');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('best_books').truncate();
});

test('[1] verify we are using the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

describe('test the bestBooks model', () => {
  test('[2] the table is empty', async () => {
    const books = await db('best_books');
    expect(books).toHaveLength(0);
  });

  test('[3] multiple books get inserted', async () => {
    let result = await bestBooksModel.insert({
      name: 'A Tale of Two Cities',
      author: 'Charles Dickens',
    });
    expect(result).toEqual({
      name: 'A Tale of Two Cities',
      author: 'Charles Dickens',
      id: 1,
    });
    let books = await db('best_books');
    expect(books).toHaveLength(1);

    await bestBooksModel.insert({
      name: 'A Wrinkle in Time',
      author: "Madeleine L'engle",
    });
    books = await db('best_books');
    expect(books).toHaveLength(2);
  });

  test('[4] a book without an author is added', async () => {
    let result = await bestBooksModel.insert({
      name: 'The Book Thief',
    });
    expect(result).toEqual({
      name: 'The Book Thief',
      id: 1,
      author: null,
    });
    let books = await db('best_books');
    expect(books).toHaveLength(1);
  });

  test('[5] can get by id', async () => {
    const { id } = await bestBooksModel.insert({
      name: 'The Alchemist',
      author: 'Paulo Coelho',
    });
    const result = await bestBooksModel.getById(id);
    expect(result).toHaveProperty('name', 'The Alchemist');
  });

  test('[6] updates a book', async () => {
    const [id] = await db('best_books').insert({
      name: 'Salt Acid Heat Fat',
      author: 'Samin Nosrat',
    });
    let result = await bestBooksModel.update(id, {
      name: 'Salt Fat Acid Heat',
    });

    expect(result).toEqual({
      id,
      name: 'Salt Fat Acid Heat',
      author: 'Samin Nosrat',
    });
    result = await bestBooksModel.getById(id);
    expect(result).toEqual({
      id,
      name: 'Salt Fat Acid Heat',
      author: 'Samin Nosrat',
    });
  });

  test('[7] deletes a book', async () => {
    let result = await bestBooksModel.insert({
      name: 'The Happiness Project',
      author: 'Gretchen Rubin',
    });
    result = await bestBooksModel.getById(result.id);
    expect(result).toHaveProperty('name', 'The Happiness Project');
    result = await bestBooksModel.remove(result.id);
    expect(result).toEqual({
      id: 1,
      name: 'The Happiness Project',
      author: 'Gretchen Rubin',
    });
    result = await bestBooksModel.getById(result.id);
    expect(result).not.toBeDefined();
  });
});

describe('[8] test server endpoints', () => {
  test('call the `up` endpoint', async () => {
    const result = await request(server).get('/');
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ api: 'up' });
  });

  test('[9][GET] /bestbooks', async () => {
    let result = await request(server).get('/bestbooks');
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body).toHaveLength(0);

    await bestBooksModel.insert({
      name: 'All the Light We Cannot See',
      author: 'Anthony Doerr',
    });

    result = await request(server).get('/bestbooks');
    expect(result.body).toHaveLength(1);
  });

  test('[10][GET] /bestbooks/:id', async () => {
    let result = await bestBooksModel.insert({
      name: 'The Rent Collecter',
      author: 'Camron Wright',
    });
    result = await request(server).get('/bestbooks/' + result.id);
    expect(result.body.name).toBe('The Rent Collecter');
  });

  test('[11][POST] /bestbooks', async () => {
    let result = await request(server)
      .post('/bestbooks')
      .send({ name: 'The Count of Monte Cristo', author: 'Alexandre Duma' });
    expect(result.status).toBe(201);

    result = await bestBooksModel.getById(1);
    expect(result.name).toBe('The Count of Monte Cristo');
  });

  test('[12][PUT] /bestbooks/:id', async () => {
    let { id } = await bestBooksModel.insert({
      name: 'Radically Candid',
      author: 'Kim Scott',
    });
    let result = await request(server)
      .put('/bestbooks/' + id)
      .send({ name: 'Radical Candor' });
    expect(result.body).toEqual({
      name: 'Radical Candor',
      id,
      author: 'Kim Scott',
    });
    let book = await bestBooksModel.getById(id);
    expect(book).toEqual({ name: 'Radical Candor', id, author: 'Kim Scott' });
  });

  test('[13][DELETE] /bestbooks/:id', async () => {
    let { id } = await bestBooksModel.insert({
      name: 'Romeo & Juliet',
      author: 'William Shakespeare',
    });
    let result = await request(server).delete('/bestbooks/' + id);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({
      name: 'Romeo & Juliet',
      author: 'William Shakespeare',
      id: 1,
    });
    const books = await db('best_books');
    expect(books).toHaveLength(0);
  });
});
