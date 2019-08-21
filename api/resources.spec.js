/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest'); // calling it "request" is a common practice
const Resources = require('../database/dbConfig'); // this is our first red, file doesn't exist yet
const db = require('../database/dbConfig');

describe('resources model', () => {
	// http calls made with supertest return promises, we can use async/await if desired
	beforeEach(async () => {
		await db('resources').truncate();
	});

	const resource = {
		resource : 'ResourceA',
	};

	describe('add', () => {
		it('resource not be empty', () => {
			expect(resource).toMatchObject({
				resource : expect.any(String),
			});
		});

		it('should add the provided resources into the db', async () => {
			await Resources.add({ resource });
			const resources = await db('resources');
			expect(resources).toHaveLength(1);
		});
	});
	describe('destroy', () => {
		const id = 1;

		it('id should be a number', () => {
			expect(id).not.toBeNaN();
		});
		it('resource should be in db', async () => {
			await Resources.add({ resource });
			const resource = await Resources.findById(id);
			expect(resource).toBeTruthy();
		});
	});
});
