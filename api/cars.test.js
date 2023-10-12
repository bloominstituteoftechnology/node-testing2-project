const db = require("../data/dbConfig")
const server = require('./server')
const request = require("supertest")

const URL = '/api/cars';

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
})

describe("[0] Sanity Test", () => {
    test("[a] test suite works", () => {
        expect(1).toBe(1);
    })
    test("[b] Test Environment", () => {
        expect(process.env.Node_ENV).toBe("testing");
    });
})

describe("[Get]", () => {
    test("[a] Status 200 Recieved", async () => {
        const res = await request(server).get(`${URL}`);
        expect(res.status).toBe(200)
    })
    test("[b] Correct first entry ", async () => {
        const res = await request(server).get(`${URL}/1`);
        expect(res.body.model_name).toContain("Highlander")
    })
});

describe("[GET] /:id", () => {
    test("[a] endpoint gets a single car of the given id", async () => {
      const res = await request(server).get(`${URL}/1`);
      expect(res.body).toMatchObject({ model_name: "Highlander", model_year: "2024" });
    });
    test("[b] responds with status 200 OK", async () => {
      const res = await request(server).get(`${URL}/1`);
      expect(res.status).toBe(200);
    });
    test("[c] responds with status 404 if id not found", async () => {
      const res = await request(server).get(`${URL}/10`);
      expect(res.status).toBe(404);
    });
    test("[d] responds with appropriate error message if id not found", async () => {
      const res = await request(server).get(`${URL}/10`);
      expect(res.body.message).toBe("Car not found");
    });
  });

describe("[Post] ", () => {
    
    const newCar = { "model_name":"Corola", "model_year":2024, "make_id":1}
    test("[a] Insert a new car into the table", async () => {
        const res = await request(server).post(`${URL}`).send(newCar);
        expect(res.body.model_name).toContain("Corola")
    })
    test("[b] Expect Return status to be 201 ", async () => {
        const res = await request(server).post(`${URL}`).send(newCar);
        expect(res.status).toBe(201)
    })
});

describe("[Put] /:id", () => {
    const modifiedCar = { "model_name":"Highlander", "model_year":2023}
    test("[a]Modify car in the table", async () => {
        const res = await request(server).put(`${URL}/1`).send(modifiedCar);
        expect(res.body).toBe(1)
    })
    test("[b] Expect Return status to be 201 ", async () => {
        const res = await request(server).put(`${URL}/1`).send(modifiedCar);
        expect(res.status).toBe(200)
    })
});
    
