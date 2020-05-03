const db = require("../database/dbConfig.js");
const UserTbl = require("../users/userModel.js");

describe("User Model", () => {
  describe("INSERT ", () => {
    it("should insert users in the database", async () => {
      const user = {
        username: "raza13",
        password: "pass123",
      };
      await UserTbl.insert(user);
      const addedUser = await db("users");
      expect(addedUser).toHaveLength(1);
    });
  });
});

beforeAll(async () => {
  await db("users").truncate();
});
