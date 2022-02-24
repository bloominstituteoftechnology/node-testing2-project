// Imports
const db = require('../data/db-config');
const Avengers = require('./avengers/avengers-model');
const request = require('supertest');
const server = require('./server');

// Before
beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await db('avengers').truncate();
});

// Sanity Check
test('sanity check', () => {
	expect(1+2).toEqual(3);
});

// Test Model
describe('testing data model', () => {

	test('model defaults to empty', async () => {
		const lineup = await db('avengers');
		expect(lineup).toHaveLength(0);
	});

	test('can forge a new Avenger', async () => {
		// Forge Avenger
		const hero = await Avengers.forge({ secret_identity: 'Spiderman' });
		expect(hero).toEqual({ id: 1, secret_identity: 'Spiderman' });
		// Check Lineup
		const lineup = await db('avengers');
		expect(lineup).toHaveLength(1);
	});

	test('can call an Avenger to the rescue', async () => {
		// Forge Avenger
		const {id} = await Avengers.forge({ secret_identity: 'Thor' });
		// Call Avenger
		const hero = await Avengers.call(id);
		expect(hero).toEqual({ id: 1, secret_identity: 'Thor' });
	});

	test('can upgrade an Avenger', async () => {
		// Forge Avenger
		const {id} = await Avengers.forge({ secret_identity: 'Captain America' });
		// Upgrade Avenger
		const hero = await Avengers.upgrade(id, { secret_identity: 'Captain Marvel' });
		expect(hero).toEqual({ id, secret_identity: 'Captain Marvel' });
	});

	test('can terminate an Avenger', async () => {
		// Forge Avenger
		const {id} = await Avengers.forge({ secret_identity: 'Iron Man' });
		// Check Stark Tower
		let starkTower = await db('avengers');
		expect(starkTower).toHaveLength(1);
		// Terminate Avenger ****SPOILER ALERT****
		const hero = await Avengers.terminate(id);
		expect(hero).toEqual({ id: 1, secret_identity: 'Iron Man' });
		// Recheck Stark Tower
		starkTower = await db('avengers');
		expect(starkTower).toHaveLength(0);
	});
});

// Test Server
describe('testing server calls', () => {

	test('[GET] /avengers', async () => {
		// Forge Avenger
		await Avengers.forge({ secret_identity: 'Dr. Strange' });
		// GET request
		const lineup = await request(server).get('/avengers');
		expect(lineup.body).toBeInstanceOf(Array);
		expect(lineup.body).toHaveLength(1);
	});
	
	test('[GET] /avengers/:id', async () => {
		// Forge Avenger
		let hero = await Avengers.forge({ secret_identity: 'Groot' });
		// GET request
		hero = await request(server).get('/avengers/' + hero.id);
		expect(hero.body).toEqual({ id: 1, secret_identity: 'Groot' });
	});

	test('[POST] /avengers', async () => {
		// POST request
		let hero = await request(server)
			.post('/avengers')
			.send({ secret_identity: 'Scarlet Witch' });
		expect(hero.body).toEqual({ id: 1, secret_identity: 'Scarlet Witch' });
	});

	test('[PUT] /avengers/:id', async () => {
		// Forge Avenger
		let {id} = await Avengers.forge({ secret_identity: 'Hulk' });
		// PUT Request
		let hero = await request(server)
			.put('/avengers/' + id)
			.send({ secret_identity: 'Smart Hulk' });
		expect(hero.body).toEqual({ id, secret_identity: 'Smart Hulk' });
	});

	test('[DELETE] /avengers/:id', async () => {
		// Forge Avenger
		let {id} = await Avengers.forge({ secret_identity: 'Black Widow' });
		// DELETE Request ****SPOILER ALERT****
		let fallenHero = await request(server).delete('/avengers/' + id);
		expect(fallenHero.body).toEqual({ id, secret_identity: 'Black Widow' });
		// Check Lineup
		const lineup = await db('avengers');
		expect(lineup).toHaveLength(0);
	});

});
