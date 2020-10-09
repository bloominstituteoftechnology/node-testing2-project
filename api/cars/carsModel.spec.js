const db = require("../../data/db-config");
const Cars = require("../cars/carsModel");

describe("cars model", () => {
  describe("insert()", () => {
    test("should insert the provided car into the DB", async () => {
      await Cars.insert({
        make: "nissan",
        model: "maxima",
        year: 2012,
      });
      await Cars.insert({
        make: "toyota",
        model: "corolla",
        year: 2011,
      });

      const carsInfo = await db("cars-info");
      expect(carsInfo).toHaveLength(2);
    });

    test("should return what was inserted", async () => {
      let carsInfo = await Cars.insert({
        make: "nissan",
        model: "sentra",
        year: 2002,
      });
      expect(carsInfo.model).toBe("sentra");

      carsInfo = await Cars.insert({
        make: "nissan",
        model: "maxima",
        year: 2012,
      });
      expect(carsInfo.year).toBe(2012);
    });

    //----------------------------------------------------------------------------//
    //
    // jest.beforeEach() specifies a method that is executed before each test. You
    // would use this to do any setup or value initialization needed before *every*
    // test.
    //
    //----------------------------------------------------------------------------//

    beforeEach(async () => {
      await db("cars-info").truncate();
    });
  });

  describe("update()", () => {
    test("should update the specific car into the DB", async () => {
      await Cars.update(1, {
        make: "hyundai",
        model: "elantra",
        year: 2012,
      });

      const carsInfo = await db("cars-info").where("id", 1).first();
      expect(carsInfo.model).toBe("elantra");
    });
  });

  describe("getAll()", () => {
    test("should update the specific car into the DB", async () => {
      const allCars = await Cars.getAll();

      const carsInfo = await db("cars-info");
      expect(carsInfo.length).toEqual(allCars.length);
    });
  });

  describe("remove()", () => {
    test("should update the specific car into the DB", async () => {
      await Cars.remove(1);

      const carsInfo = await db("cars-info");
      expect(carsInfo).toHaveLength(1);
    });
  });
});
