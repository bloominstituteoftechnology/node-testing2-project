require("dotenv").config();

describe("database", () => {
  describe("environement", () => {
    it("should use the testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
});
