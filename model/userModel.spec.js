const Users = require('./userModel');
const db = require('../data/dbConfig');
const { use } = require('../api/auth/authRouter');


beforeAll( async ()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=>{
    await db('users').truncate();
})

afterAll(async ()=>{
    await db.destroy();
})

describe('users model', ()=>{
    describe('insert()', ()=>{
        test('inserts the provided user', async ()=>{
            let usersLength;
            usersLength = await db('users');
            expect(usersLength).toHaveLength(0);
            await Users.insert({username: 'ass', password: 'ass', department: 'ass'})
            usersLength = await db('users');
            expect(usersLength).toHaveLength(1);
        })
    })

    // describe('remove()', ()=>{
    //     test('removes the provided user.', async()=>{
    //         const newUser = await Users.insert({username: 'testuser', password: 'testpassword', department: 'Hosting'})
    //         await Users.remove(newUser)
    //     })
    // })
})

