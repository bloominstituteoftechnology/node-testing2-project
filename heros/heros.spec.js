const db = require('../database/dbConfig')
const Heros = require('./herosModel')


describe('heros model', () => {
    describe('insert', () => {
        it('should insert the provided hero into the db', async () => {
            await Heros.insert({ name: "Tupac" });
            await Heros.insert({ name: "Jada P.Smith" });

            const heros = await db('heros');
          
        })

    })
})

beforeEach(async () => {
    await db('heros').truncate();
})