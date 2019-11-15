const { validateUser } = require("./users-helpers.js");

// sent an object with a username less than 2 characters, we verified it failed
// sent an object with a valid username, no password

// sent an empty object, we saw the result fail
describe("users helpers", () => {
  describe("validateUser()", () => {
    it("should fail when missing username and password", () => {
      // Arrange: setup the world for test
      const invalidUser = {};
      const expected = false;

      // Act: execute the system under test (SUT) => validateUser method
      const actual = validateUser(invalidUser);

      // Assert: we check the result
      expect(actual.isSuccessful).toBe(expected); //matchers
      expect(actual.errors).toHaveLength(2);
    });

    test("should fail if missing password", () => {
      const result = validateUser({ username: "somebody" });

      expect(result.isSuccessful).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toMatch(/include a password/i);
    });

    it("should succeed if callnomed with a valid user", () => {
      const result = validateUser({
        username: "somebody",
        password: "valid password"
      });

      expect(result.isSuccessful).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // it.todo("should fail if username is an object");
    // it.todo("should fail if username is an array");
    // it.todo("should fail if username is an NaN");
    // it.todo("should fail if username is an null");
  });
});
