const db = require("../../data/config");
const CPU = require("./CPUModel");

const CPURouter = require("../../../server");
const request = require("supertest");

describe("Endpoint GET /cpu", () => {
  it("GET all cpus in database return array", () => {
    return request(CPURouter)
      .get("/cpu")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it("POST a new Resource return array with id", () => {
    return request(CPURouter)
      .post("/cpu")
      .send({
        Manufacter: "AMD",
        Model: "Ryzen 5 2600",
        Socket: "AM4",
        ClockSpeed: 3.8,
        Price: 165
      })
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(typeof res.body[0]).toBe("number");
      });
  });

  it("Delete a Resource", () => {
    const resource = {
      Manufacter: "AMD",
      Model: "Ryzen 5 2600",
      Socket: "AM4",
      ClockSpeed: 3.8,
      Price: 165
    };

    const id = CPU.insert(resource);
    return request(CPURouter)
      .delete(`/cpu/${id[0]}`)
      .then(res => {
        expect(typeof res.body).toBe("number");
      });
  });
});
