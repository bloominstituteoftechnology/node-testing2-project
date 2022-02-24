const Shoungs = require('./shoung-model');
const db = require('../../data/db-config');
const request = require('supertest');


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('shoungs').truncate();
});

describe('test the shoung model', () => {
    test('can get empty table', async () => {
        const shoungs = await db('shoungs');
        expect(shoungs).toHaveLength(0);
    });

    test('can get by ID', async () => {
        const {id} = await Shoungs.insert({ name: 'coco', age: 1 });
        const result = await Shoungs.getById(id);
        expect(result).toHaveProperty('name', 'coco');
        expect(result).toHaveProperty('age', 1);
    });

    test('can insert', async () => {
        let result = await Shoungs.insert({ name: 'coco', age: 1 });
        expect(result).toEqual({ name: 'coco', age: 1, id: 1});
        
        let shoungs = await db('shoungs');
        expect(shoungs).toHaveLength(1);

        await Shoungs.insert({ name: 'cat', age: 2});
        shoungs = await db('shoungs');
        expect(shoungs).toHaveLength(2);
    });

    test('can update', async () => {
        const [id] = await db('shoungs').insert({ name: 'coco', age: 1 });
        let result = await Shoungs.update(id, {name: 'cat', age: 2 });
        expect(result).toEqual({ id, name: 'cat', age: 2 });
        
        result = await Shoungs.getById(id);
        expect(result).toEqual({ id, name: 'cat', age: 2 });
    });

    test('can remove', async () => {
        let result = await Shoungs.insert({ name: 'Coco', age: 1 });
        result = await Shoungs.getById(result.id);
        expect(result).toHaveProperty('name', 'Coco');
        expect(result).toHaveProperty('age', 1);

        result = await Shoungs.remove(result.id);
        expect(result).toEqual({ id: 1, name: 'Coco', age: 1 });

        result = await Shoungs.getById(result.id);
        expect(result).not.toBeDefined();
    });
});