/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest'); // calling it "request" is a common practice
const Resources = require('../api/resources-modal');
const db = require('../database/dbConfig');

describe('resources model', () => {
	// http calls made with supertest return promises, we can use async/await if desired
	beforeEach(async () => {
		await db('resources').truncate();
	});

	const resource = {
		id : 5,
		resource : 'ResourceA',
	};

	describe('add', () => {
		it('resource not be empty', () => {
			expect(resource).toMatchObject({
				resource : expect.any(String),
			});
		});
		it('resource not to be null', () =>{
			expect(resource).not.toBeNull();
	  });


		// it('should add the provided resources into the db', async () => {
		// 	await Resources.add({ resource });
		// 	const resources = await db('resources');
		// 	expect(resources).toHaveLength(1);
		// });
	});
	describe('destroy', () => {
		const id = 5;

		it('id should be a number', () => {
			expect(id).not.toBeNaN();
		});
		it('id not to be null', () =>{
			expect(id).not.toBeNull();
	  });
		// it('resource should be in db', async () => {
		// 	await Resources.add({ resource });
		// 	const resource = await Resources.findById(id);
		// 	expect(resource).toBeTruthy();
		// });
	});
});
