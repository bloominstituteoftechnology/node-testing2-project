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
});

describe('model tests', () => {
  test('getAll()', async () => {
    const result = await Anime.getAll();
    expect(result).toHaveLength(4);
    expect(result[1]).toHaveProperty('name', 'Sachi Komine');
  });
  test('getById()', async () => {
    let result = await Anime.getById(2);
    expect(result).toBeDefined();
    expect(result.id).toBe(2);
    expect(result.name).toBe('Sachi Komine');

    result = await Anime.getById(100);
    expect(result).not.toBeDefined();
  });

  test('add()', async () => {
    let result = await Anime.add({name: 'Suffolk'});
    expect(result.id).toBe(5);
    expect(result.name).toBe("Suffolk");

    result = await Anime.getAll();
    expect(result).toHaveLength(5);
    expect(result[4]).toHaveProperty('name', 'Suffolk');
  });
  test('update()', async () => {
    let result = await Anime.update(1, {name: 'Amane Suou'});
    expect(result.id).toBe(1);
    expect(result.name).toBe('Amane Suou');

    result = await Anime.getAll();
    expect(result).toHaveLength(4);
    expect(result[0]).toHaveProperty('name', 'Amane Suou');
  });
  test('remove()', async () => {
    let result = await Anime.remove(3);
    expect(result.name).toBe('Yukari Akiyama');
    expect(result.id).toBe(3);

    result = await Anime.getById(3);
    expect(result).not.toBeDefined();
  });

});

describe('HTTP Tests', () => {
  test('API is up', async () => {
    let res = await request(server).get('/');
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({api: 'up'});
  });
  test('GET /anime-girls', async () => {
    let res = await request(server).get('/anime-girls');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(4);
  });
  test('GET /anime-girls/:id', async () => {
    let res = await request(server).get('/anime-girls/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('name', 'Rias Gremory');
  });
  test('POST /anime-girls', async () => {
    let res = await request(server).post('/anime-girls').send({name: 'Albedo'});
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('name', 'Albedo');

    res = await Anime.getAll();
    expect(res).toHaveLength(5);
    expect(res[4]).toHaveProperty('name', 'Albedo');
  })
  test('PUT /anime-girls/:id', async () => {
    let res = await request(server).put('/anime-girls/3').send({name: 'Koko Kaga'});
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('name', 'Koko Kaga');

    res = await Anime.getById(3);
    expect(res.name).toBe("Koko Kaga");
  })
  test('DELETE /anime-girls/:id', async () => {
    let res = await request(server).delete('/anime-girls/3');
    expect(res.body.id).toBe(3);
    expect(res.body.name).toBe('Yukari Akiyama');

    res = await Anime.getAll();
    expect(res).toHaveLength(3);
    expect(res[2]).toHaveProperty('name', 'Marin Kitagawa');
  })
});