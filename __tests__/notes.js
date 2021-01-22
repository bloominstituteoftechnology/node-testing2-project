const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/config");

beforeEach(async () => {
    await db.seed.run();
});

afterAll( async () => {
    await db.destroy();
});

describe('notes', () => {
    it('gets a list of notes', async () => {
        const response = await supertest(server)
            .get('/api/notes');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.length).toBe(3);
    });

    it('gets by id', async () => {
        const response = await supertest(server)
            .get('/api/notes/1');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.id).toBe(1)
    });

    it('returns 404 if note not found', async () => {
        const response = await supertest(server)
            .get('/api/notes/5');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("note not found")
    });

    it('adds a note', async () => {
        const response = await supertest(server)
            .post('/api/notes')
            .send({title: 'a title', description: 'this is a note'});
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('a title');
    });

    it('error if title is missing', async () => {
        const response = await supertest(server)
            .post('/api/notes')
            .send({description: 'this is a note'});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Title is required.")
    });

    it('edits a note', async () => {
        const response = await supertest(server)
            .put('/api/notes/3')
            .send({title: 'edited', description: 'some text'});
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('edited');
    });

    it('deletes a note', async () => {
        const response = await supertest(server)
            .delete('/api/notes/3');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("note deleted");
    });

    it('reports unable to delete note if not deleted', async () => {
        const response = await supertest(server)
            .delete('/api/notes/5');
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("unable to delete note");
    })

});