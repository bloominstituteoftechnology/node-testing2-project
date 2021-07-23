const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')

test('testing for correct environment', () => {
    expect(process.env.DB_ENV).toBe('testing')
})
beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})

describe('[DELETE] /games', () => {
    test('responds with status code 200', async () => {
        const res = await request(server).delete('/api/games/1')
        expect(res.status).toBe(200)
    })

    test('responds with the newly deleted game', async () => {
        const res = await request(server).delete('/api/games/1')
        expect(res.body).toMatchObject({
            game_title: 'Eternal Darkness',
            game_genre: 'Horror'
        })
    })
    
    // test('it deletes a new game in the db', async () => {
    //     // remove game
    //     Games.remove(1)
    //     // get all games
    //     const remainingGames = await Games.getAll()
    //     // check that the length of the games db is now 4
    //     expect(remainingGames).toHaveLength(4)
    // })
    // test('it resolves to the recently deleted game', async () => {

    // })
})