const server = require("../server");
const request = require("supertest");

describe("users routes", () => {
	it("should had environment var correctly set", () => {
		expect(process.env.DB_ENV).toBe("testing");
	});

	it("should return 200", () => {
		request(server)
			.get("/api/users")
			.then(result => {
				expect(result.status).toBe(400);
			});
	});
	it("should return a token", () => {
		return request(server)
			.post("/api/auth/login")
			.send({
				username: "rodrigograca31",
				password: "12345"
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then(result => {
				expect(result.body.token.length).toBeGreaterThan(50);
				expect(result.status).toBe(200);
			});
	});
	it("should get users", async () => {
		const login = await request(server)
			.post("/api/auth/login")
			.send({
				username: "rodrigograca31",
				password: "12345"
			})
			.set("Content-Type", "application/json");

		const users = await request(server)
			.get("/api/users")
			.set("Content-Type", "application/json")
			.set("Authorization", login.body.token);

		console.log(users.body);

		expect(users.body).toMatchObject([
			{ id: 1, username: "rodrigograca31" },
			{ id: 2, username: "emma" }
		]);
	});
});
