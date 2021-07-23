const db = require('../../data/dbConfig')
const Games = require('./games-model')

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

describe('insert game tests', () => {
    test('it creates a new game in the db', async () => {
        const game = {
            game_title: 'Super Will Adventure',
            game_genre: 'WIP'
        }
        await Games.create(game)
        const insertedGame = await db('games')
            .where('game_id', 6).first()
        expect(insertedGame).toMatchObject({
            game_title: 'Super Will Adventure',
            game_genre: 'WIP'
        })
    })
    test('it resolves to the newly created game', async () => {
        const game = {
            game_title: 'Super Will Adventure',
            game_genre: 'WIP'
        }
        const insertedGame = await Games.create(game)
        expect(insertedGame).toMatchObject({
            game_title: 'Super Will Adventure',
            game_genre: 'WIP'
        })
    })
})

// describe('remove game tests', () => {
//     test('it deletes a new game in the db', async () => {
//         // remove game
//         Games.remove({ game_id: 1})
//         // get all games
//         const remainingGames = await Games.getAll()
//         // check that the length of the games db is now 4
//         expect(remainingGames).toHaveLength(4)
//     })
//     test('it resolves to the recently deleted game', async () => {

//     })
// })