const request = require('supertest')
const db = require('../../data/dbConfig.js')
const Member = require('./testModel')
const server = require('../server');


const member1 = {name: 'isaias', lastname: 'hagos'}
const member2 = {name: 'tsega', lastname: 'ghebreslassie'}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('tests').truncate();
  })
  afterAll(async () => {
    await db.destroy()
  })

test("sanity check", () =>{
    expect(true).toBe(true)
})
test("Process env works", () =>{
    expect(process.env.DB_ENV).toBe('testing')
})

describe('testing model.js', () =>{
    it('create new member', async()=> {
        let members
        await Member.createMember(member1)
        members = await db('tests')
        expect(members).toHaveLength(1)

        //add another one
        await Member.createMember(member2)
        members = await db('tests')
        expect(members).toHaveLength(2)
    })
    it('created name and lastname', async () =>{
        let members
        await Member.createMember(member1)
        members = await db('tests')
        expect(members[0]).toHaveProperty('name', 'isaias')
        expect(members[0]).toMatchObject({ name: 'isaias', lastname: 'hagos' })
    })
describe('testing delete model.js', () =>{
    it('delted a member', async () =>{
        const [test_id] = await db('tests').insert(member2)
        let members = await db('tests').where({test_id}).first()
        expect(members).toBeTruthy()
        await request(server).delete('/tests/'+test_id)
        members = await db('tests').where({test_id}).first()
        expect(members).toBeFalsy()
    })
})
})