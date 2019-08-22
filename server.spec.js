const request = require("supertest");

const server = require("./server");

describe("superheroes server", () => {
  // ==================== GET TESTS ====================
  describe("GET /superheroes", () => {
    it("returns status code 200", async () => {
      let response = await request(server).get("/superheroes");
      expect(response.status).toBe(200);
    });
    // =============== ALTERNATE METHOD ===============
    // it("returns 200 OK", () => {
    //   return request(server)
    //     .get("/superheroes")
    //     .then(res => {
    //       expect(res.status).toBe(200);
    //     });
    // });

    it("returns JSON", async () => {
      let response = await request(server).get("/superheroes");
      expect(response.type).toBe("application/json");
      // =============== ALTERNATE METHOD ===============
      //   expect(response.type).toMatch(/json/);
    });

    it("returns array", async () => {
      let response = await request(server).get("/superheroes");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
