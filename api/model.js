const db = require('../db-config.js');


module.exports = {
    findUsers,
    findUserById,
    register,
    remove,
}


async function findUsers() {
    try {
        return await db('users')
    } catch (err) {
        throw err;
    }
}

async function findUserById(userID) {
    try {
        return await db('users').where({id: userID}).first();
    } catch (err) {
        throw err;
    }
}

async function register(newUser) {
    try {
        const ids = await db('users').insert(newUser);
        return findUserById(ids[0]);
    } catch (error) {
        throw error
    }
}

async function remove(id) {
    try {
        const removed = await db('users').where({id}).del();
        return removed;
    } catch (error) {
        throw error
    }
}
