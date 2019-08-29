const db = require("../data/dbConfig.js");
const Books = require("./bookModel.js");

describe("book model", () => {
  describe("insert()", () => {
    it("should insert book", async () => {
      await Books.insert({ title: "the hobbit", author: "jrr tolkien" });

      const books = await db("books");
      expect(books).not.toBeLessThan(3);
    });
  });

  describe("delete()", () => {
    it("should delete book", async () => {
      await Books.delete({ id: 1 });
      const books = await db("books");
      expect(books).not.toContain({
        title: "leviathan",
        author: "thomas hobbes "
      });
    });
  });
});
