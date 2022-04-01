const db = require('../data/db-config');
const server = require('./server');
const request = require('supertest');

const Cats = require('./cats/cats-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db('cats').truncate();
});
afterAll(async () => {
    await db.destroy();
});

test('sanity check', () => {
    expect(1).toBe(1);
});

test('test cats-model', async () => {
    // getAll
    result = await Cats.getAll();
    expect(result).toHaveLength(0);

    // insert
    result = await Cats.insert({ name: 'a', breed: 'b', age: 1, hairless: false });
    expect(result).toEqual({ name: 'a', breed: 'b', age: 1, hairless: false, cat_id: 1 });
    result = await Cats.getAll();
    expect(result).toHaveLength(1);

    // getById
    result = await Cats.getById(2);
    expect(result).not.toBeDefined();
    result = await Cats.getById(1);
    expect(result).toHaveProperty('name', 'a');
    
    // update
    result = await Cats.update(1, {name: 'c'});
    expect(result).toHaveProperty('name', 'c');
    result = await Cats.getById(1);
    expect(result).toHaveProperty('name', 'c');

    // remove
    result = await Cats.remove(999);
    expect(result).not.toBeDefined();
    result = await Cats.getAll();
    expect(result).toHaveLength(1);
    result = await Cats.remove(1);
    expect(result).toMatchObject({name: 'c'});
    result = await Cats.getAll();
    expect(result).toHaveLength(0);
})

test('[GET] /api', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ api: 'up' });
});

test('[GET] /api/cats', async () => {
    const res = await request(server).get('/api/cats');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
});

test('[POST] /api/cats', async () => {
    const res = await request(server).post('/api/cats').send({ name: 'a', breed: 'b', age: 1, hairless: false });
    expect(res.body).toEqual({ name: 'a', breed: 'b', age: 1, hairless: false, cat_id: 1 });
    expect(res.status).toBe(201);
});

test('[GET] /api/cats/:id returns cats with proper id', async () => {
    await Cats.insert({ name: 'a', breed: 'b', age: 1, hairless: false });
    await Cats.insert({ name: 'c', breed: 'd', age: 2, hairless: false });
    await Cats.insert({ name: 'e', breed: 'f', age: 3, hairless: true });

    let res;
    res = await request(server).get(`/api/cats/${1}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ name: 'a', breed: 'b', age: 1, hairless: false, cat_id: 1 })
    res = await request(server).get(`/api/cats/${2}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ name: 'c', breed: 'd', age: 2, hairless: false, cat_id: 2 })
    res = await request(server).get(`/api/cats/${3}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cat_id: 3, name: 'e', breed: 'f', age: 3, hairless: true })
});

test('[GET] /api/cats/:id returns error message for bad id', async () => {
    res = await request(server).get(`/api/cats/${4}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Oops! 404, Cat not available!' });
})

test('[PUT] /api/cats/:id updates cat specified', async () => {
    await Cats.insert({ name: 'a', breed: 'b', age: 1, hairless: false });
    await Cats.insert({ name: 'c', breed: 'd', age: 2, hairless: false });
    await Cats.insert({ name: 'e', breed: 'f', age: 3, hairless: true });

    let res;

    res = await request(server).get(`/api/cats/${2}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cat_id: 2, name: 'c', breed: 'd', age: 2, hairless: false });
    
    res = await request(server).put(`/api/cats/${2}`).send({ name: 'g', breed: 'h', age: 4, hairless: true });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cat_id: 2, name: 'g', breed: 'h', age: 4, hairless: true });

    res = await request(server).get(`/api/cats/${2}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cat_id: 2, name: 'g', breed: 'h', age: 4, hairless: true });
});

test('[PUT] /api/cats/:id returns error message for bad id', async () => {
    let res;
    
    res = await request(server).put(`/api/cats/${999}`).send({ cat_id: 2, name: 'g', breed: 'h', age: 4, hairless: true });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'cats not found' });
});

test('[DELETE] /api/cats/:id deletes cat from database and returns proper cat', async () => {
    await Cats.insert({ name: 'a', breed: 'b', age: 1, hairless: false });
    await Cats.insert({ name: 'c', breed: 'd', age: 2, hairless: false });
    await Cats.insert({ name: 'e', breed: 'f', age: 3, hairless: true });
    let res;
    
    res = await request(server).delete(`/api/cats/${2}`);
    expect(res.body).toEqual({ cat_id:2, name: 'c', breed: 'd', age: 2, hairless: false });
    expect(res.status).toBe(200);
    expect(await Cats.getAll()).toHaveLength(2);

    res = await request(server).delete(`/api/cats/${1}`);
    expect(res.body).toEqual({ cat_id: 1, name: 'a', breed: 'b', age: 1, hairless: false });
    expect(res.status).toBe(200);
    expect(await Cats.getAll()).toHaveLength(1);

});

test('[DELETE] /api/cats/:id returns error message on bad id and doesn\'t delete anything', async () => {
    await Cats.insert({ name: 'a', breed: 'b', age: 1, hairless: false });
    await Cats.insert({ name: 'c', breed: 'd', age: 2, hairless: false });
    await Cats.insert({ name: 'e', breed: 'f', age: 3, hairless: true });
    let res;
    
    res = await request(server).delete(`/api/cats/${18475891}`);
    expect(res.body).toEqual({ message: 'cats not found' });
    expect(res.status).toBe(404);
    expect(await Cats.getAll()).toHaveLength(3);
});