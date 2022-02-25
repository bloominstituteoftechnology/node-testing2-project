test("it is the correct environment for the tests", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});
