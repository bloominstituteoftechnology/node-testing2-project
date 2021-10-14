const db = require('../../data/db-config');
const mb = require('./user-model');
test('enviroment is testing ', () => {
    expect(process.env.NODE_ENV).toBe('testing');
});

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

// afterAll(async () => {
//     await db.destroy();
// });

describe('user.getAll()', () => {
    let allUsers;
    beforeEach(async () => {
        allUsers = await mb.getAll();
    });
    it('shuld return all users (3)', async () => {
        expect(allUsers).toHaveLength(3);
    });
    it('users must have hte correct shape', async () => {
        expect(allUsers).toMatchObject([
            {
                name: 'ehsan',
                age: 20,
            },
            {
                name: 'john',
                age: 21,
            },
            {
                name: 'tom',
                age: 22,
            },
        ]);
    });
});

describe('get getByName', () => {
    it('should return a user object', async () => {
        const user = await mb.getByName('ehsan');
        expect(user).toBeDefined();
    });
});

describe('insert new user', () => {
    it('insert new user should add one to all users', async () => {
        await mb.insert({ name: 'toto', age: 30 });
        const allUsers = await db('users');
        expect(allUsers).toHaveLength(4);
    });
    it('insert new user should retun a object with new user in it', async () => {
        const user = await mb.insert({ name: 'toto', age: 30 });
        expect(user).toBeDefined();
        expect([user]).toHaveLength(1);
        expect(user.name).toBe('toto');
        expect(user).toMatchObject({ name: 'toto', age: 30 });
    });
});
describe('remove : remove a user from database', () => {
    it('removing an user make the database to say the same', async () => {
        const [id] = await db('users').insert({ name: 'toto', age: 30 });
        let user = await db('users').where('id', id).first();
        expect(user).toBeDefined();
        expect(user).toBeTruthy();
        await mb.remove(id);
        const allUsers = await db('users');
        expect(allUsers).toHaveLength(3);
    });
    it('removing a user will return the removed user', async () => {
        const [id] = await db('users').insert({ name: 'moto', age: 30 });

        const removedUser = await mb.remove(id);
        expect(removedUser).toHaveLength(0);
    });
});
