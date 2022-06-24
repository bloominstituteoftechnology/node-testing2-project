const db = require('../data/dbConfig');
const Anime = require('./anime-girls/anime-girls-model');
const server = require('./server');
const request = require('supertest');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('anime_girls').truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});
test('sanity check', () => {
  expect(1+1).toEqual(2);
})