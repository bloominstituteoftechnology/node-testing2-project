const Momento = require('./memento-model');
const db = require('../../data/db-config');


const angelina = {name: "Angelina"}
const lyub = {name: 'lyub'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("momento").truncate()
})

afterAll(async () => {
  await db.destroy()
})


// it('correct env', () => {
//   expect(process.env.DB_ENV).toBe('testing')
// })

describe("Momento model", () => {

  describe("insert function", () => {
    // testing to see if anything made it
    it("adds user to db", async () => {
      let all;
      await Momento.insert(angelina)
      all = await db('momento')
      expect(all).toHaveLength(1)

      await Momento.insert(lyub)
      all = await db("momento")
      expect(all).toHaveLength(2)

    })

    it("values of hobbits", async () => {
      const person = await Momento.insert(angelina)
      expect(person).toMatchObject({id:1, ...angelina})
    })

  })

  describe("delete function",  () => {

      test('remove from database', async () => {
        await Momento.insert(angelina);

        let data = await db('momento');
        expect(data).toHaveLength(1);

        await Momento.deleteBy(1);
        data = await db('momento');
        expect(data).toHaveLength(0);
      })


      test('database does not contain delete data?', async () => {

        await Momento.insert(angelina)
        await Momento.insert(lyub)

        let data = await db('momento')
        expect(data).toContainEqual({id: 1, ...angelina})

        await Momento.deleteBy(1)
        data = await db('momento')
        expect(data).not.toContainEqual({id: 1, ...angelina})


      })

  })

})