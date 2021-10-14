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
        const user = await mb.getByName('ehsan')
        expect(user).toBeDefined();
    });
});
