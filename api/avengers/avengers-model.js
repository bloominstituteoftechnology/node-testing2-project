// Imports
const db = require('../../data/db-config');

// Data Access
function assemble() {
	return db('avengers');
}

function call(id) {
	return db('avengers').where({ id }).first();
}

async function forge(avenger) {
	const [id] = await db('avengers').insert(avenger);
	return call(id);
}

async function upgrade(id, avenger) {
	await db('avengers').update(avenger).where({ id });
	return call(id);
}

async function terminate(id) {
	const avenger = await call(id);
	await db('avengers').where({ id }).del();
	return avenger;
}

// Exports
module.exports = {
	assemble,
	call,
	forge,
	upgrade,
	terminate
}