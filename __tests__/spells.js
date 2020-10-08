const supertest = require('supertest');
const server = require('../api/server');

describe('spells router tests', () => {
    it('GET /spells', async () => {
        const res = await supertest(server)
            .get('/api/spells/');

            expect(res.statusCode).toBe(200);
    });
    
    it('/GET spells by id failure', async () => {
        const res = await supertest(server)
            .get('/api/spells/5');

            expect(res.statusCode).toBe(404);
    }, 30000);

    it('/POST spells', async () => {
        const res = await supertest(server)
            .post('/api/spells/')
            .send({
                "name": "Fire Bolt",
                "level": 0,
                "school": "evocation",
                "class": "wizard",
                "castingTime": "1 action",
                "ritual": false,
                "concentration": false, 
                "wikiPage": "https://roll20.net/compendium/dnd5e/Spells:Fire%20Bolt#content"
            });

        expect(res.statusCode).toBe(201);
    }, 30000);

    it('/POST spells', async () => {
        const res = await supertest(server)
            .post('/api/spells/')
            .send({
                "name": "FireBall",
                "level": 3,
                "school": "evocation",
                "class": "wizard",
                "castingTime": "1 action",
                "ritual": false,
                "concentration": false, 
                "wikiPage": "https://roll20.net/compendium/dnd5e/Fireball#content"
            });

        expect(res.statusCode).toBe(500);
    }, 30000);

    it('/GET by id success', async () => {
        const res = await supertest(server)
            .get('/api/spells/1');

        expect(res.body.name).toBe('Fire Bolt');
    }, 30000);

    it('/PUT success', async () => {
        const res = await supertest(server)
            .put('/api/spells/2')
            .send({
                "name": "Fire Ball",
                "level": 3,
                "school": "evocation",
                "class": "wizard",
                "castingTime": "1 action",
                "ritual": false,
                "concentration": false, 
                "wikiPage": "https://roll20.net/compendium/dnd5e/Fireball#content"
            }); 
        expect(res.statusCode).toBe(200);
    });

    it('/PUT failure', async () => {
        const res = await supertest(server)
            .put('/api/spells/3')
            .send({
                "name": "Fire Bolt",
                "level": 3,
                "school": "evocation",
                "class": "wizard",
                "castingTime": "1 action",
                "ritual": false,
                "concentration": false, 
                "wikiPage": "https://roll20.net/compendium/dnd5e/Fireball#content"
            }); 
        expect(res.statusCode).toBe(500);
    });

    it('/DELETE success', async () => {
        const res = await supertest(server)
            .delete('/api/spells/1');

        expect(res.statusCode).toBe(204);
    });

    it('/DELETE failure', async () => {
        const res = await supertest(server)
            .delete('/api/spells/1');
            
        expect(res.statusCode).toBe(404);
    });
});