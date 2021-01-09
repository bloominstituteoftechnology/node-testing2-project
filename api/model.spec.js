const dbUser = require('./model.js')
const db = require('../db-config.js')

describe('user model', () => {
    describe('register', () => {

        beforeEach(async () => {
            await db('users').truncate();
        })

        test('adds new user',async() => {
            await dbUser.register({username:'moohashed', password: 'moo', department: 'Dairy'});
            await dbUser.register({username:'ladysami', password: '1234', department: 'Admin'});
            
            const users = await db('users');
            expect(users).toHaveLength(2) ;       
        });

        test('returns registered username', async () => {
            let user1 = await dbUser.register({username:'testuser999', password: 'moo', department: 'testing'});
            expect(user1.username).toBe('testuser999');

            let user2 = await dbUser.register({username:'prettysammy', password: '1234', department: 'Admin'});
            expect(user2.username).toBe('prettysammy');
        });
    });
});