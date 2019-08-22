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
		id       : 5,
		resource : 'ResourceA',
	};

	describe('add', () => {
		it('resource is not empty', () => {
			expect(resource).toMatchObject({
				resource : expect.any(String),
			});
		});
		it('resource is not null', () => {
			expect(resource).not.toBeNull();
		});
	});
	describe('destroy', () => {
		const id = 5;

		it('id is a number', () => {
			expect(id).not.toBeNaN();
		});
		it('id is not null', () => {
			expect(id).not.toBeNull();
		});
	});
});
