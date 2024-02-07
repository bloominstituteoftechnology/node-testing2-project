const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('../server.js')
const Show = require('./showsModel.js')

const show1 = {show_name:'Sweet Tooth', streaming_service: 'Netflix'}
const show2 = {show_name:'Slow Horses', streaming_service: 'Apple'}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('shows').truncate()
})

afterAll(async () => {
    await db.destroy()
})


it('correct env', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('shows model functions', () => {
    describe('create show', () => {
        it('adds a show to the db', async () => {
            let shows
            await Show.createShow(show1)
            shows = await db('shows')
            expect(shows).toHaveLength(1)

            await Show.createShow(show2)
            shows = await db('shows')
            expect(shows).toHaveLength(2)
        })
        it('inserted show and service', async () => {
            const show = await Show.createShow(show1)
            expect(show).toMatchObject({show_id:1,...show})
        })
    })
    describe('[DELETE] / -deletes show', () => {
        it('removes show from db', async () => {
            const [show_id] = await db('shows').insert(show1)
            let show = await db('shows').where({show_id}).first()
            expect(show).toBeTruthy()
            await request(server).delete('/shows/'+ show_id)
            show = await db('shows').where({show_id}).first()
            expect(show).toBeFalsy()
        })
        it('responds with the deleted show', async () => {
            await db('shows').insert(show1)
            let show = await request(server).delete('/shows/1')
            expect(show.body).toMatchObject(show1)
        })
    })
    describe("[GET] / get show by ID", () => {
        test("get show by ID", async () => {
          const [show_id] = await db("shows").insert(show1);
          const response = await request(server).get(`/shows/${show_id}`);
          expect(response.status).toBe(200);
          expect(response.body).toMatchObject(show1);
        });
        test("get show by non-existent ID", async () => {
          const response = await request(server).get("/shows/999");
          expect(response.status).toBe(404);
          expect(response.body).toEqual({ message: "show not found" });
        });
      });
      
      describe("[PUT] / update show", () => {
        test("update show in database", async () => {
          const [show_id] = await db("shows").insert(show1);
          const updates = { show_name:'', streaming_service:''};
          const response = await request(server)
            .put(`/shows/${show_id}`)
            .send(updates);
          expect(response.status).toBe(200);
          expect(response.body).toMatchObject(updates);
          const updatedshow = await db("shows")
            .where("show_id", show_id)
            .first();
          expect(updatedshow).toMatchObject(updates);
        });
        test("respond with the updated show", async () => {
          const [show_id] = await db("shows").insert(show1);
          const updates = { show_name:'', streaming_service:''};
          const response = await request(server)
            .put(`/shows/${show_id}`)
            .send(updates);
          expect(response.body).toMatchObject(updates);
        });
        test("respond with 404 for non-existent show", async () => {
          const nonExistentId = 999;
          const updates = { show_name:'', streaming_service:''};
          const response = await request(server)
            .put(`/shows/${nonExistentId}`)
            .send(updates);
      
          expect(response.status).toBe(404);
          expect(response.body).toEqual({ message: "show not found" });
        });
    })
})