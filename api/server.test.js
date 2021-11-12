const request = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

const seededData = [{"id":1,"title":"rowValue1","info":"here is the real stuff"},{"id":2,"title":"rowValue2","info":"actual info"},{"id":3,"title":"rowValue3","info":"the stuff you wanted to know"}];
const newData = {"title":"testTitle", "info":"This is just for testing purposes"};

describe("server", () => {
  describe("Info Router", () => {
    beforeEach(async () => await db("info").truncate());

    it("[1] getting returns an empty array at start", async () => {
      await request(server).get("/api/info")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual([]);
          expect(response.body).toHaveLength(0);
        });
    });
    it("[2] getting an invalid id responds with a 404", async () => {
      await request(server).get("/api/info/4")
        .then(response => {
          expect(response.status).toBe(404);
        });
    });
    it("[3] posting an appropriate object adds it to the database and returns the right response", async () => {
      await request(server).post("/api/info")
        .send(newData)
        .then(response => {
          expect(response.status).toBe(201);
          expect(response.body).toEqual({id:1, ...newData});
        });
      await request(server).get("/api/info")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveLength(1);
          expect(response.body).toEqual([{id:1, ...newData}]);
        });
    });
    it("[4] getting a valid id responds properly (after posting)", async () => {
      await request(server).post("/api/info").send(newData);
      await request(server).get("/api/info/1")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({id:1, ...newData});
        });
    });
    it("[5] updating info works as intended", async () => {
      await request(server).post("/api/info").send(newData);
      await request(server).put("/api/info/1").send(seededData[0])
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual(seededData[0]);
        });
      await request(server).get("/api/info")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual([seededData[0]]);
        });
    });
    it("[6] deleting info works as intended", async () => {
      await request(server).post("/api/info").send(newData);
      await request(server).delete("/api/info/1")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual({id:1, ...newData});
        });
      await request(server).get("/api/info")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual([]);
        })
    });
    it("[7] posting more than one still works", async () => {
      await seededData.forEach(async data => await request(server).post("/api/info").send(data));
      await request(server).get("/api/info")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual(seededData);
        })
    });
    it("[8] updating info only updates the info intended to be updated", async () => {
      await seededData.forEach(async data => await request(server).post("/api/info").send(data));
      await request(server).put("/api/info/2").send(newData);
      await request(server).get("/api/info")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual([seededData[0], {id:2, ...newData}, seededData[2]]);
        });
    });
    it("[9] deleting info only deletes the info intended to be deleted", async () => {
      await seededData.forEach(async data => await request(server).post("/api/info").send(data));
      await request(server).delete("/api/info/2");
      await request(server).get("/api/info")
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toEqual([seededData[0], seededData[2]]);
        });
    });
    it("[10] attempting to update or delete info that doesn't exist returns a 404", async () => {
      await request(server).delete("/api/info/2")
        .then(response => expect(response.status).toBe(404));
      await request(server).put("/api/info/2").send(newData)
        .then(response => expect(response.status).toBe(404));
    });
  });
});