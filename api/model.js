const db = require('../database/db-config.js');


module.exports = {
    findUsers,
    findUserById,
    findUserByName,
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

async function findUserByName(username) {
    try {
        return await db('users').where({username}).first();
    } catch (err) {
        throw err;
    }
}


async function register(newUser) {
    try {
        const registered_user = await db('users').insert(newUser);
        return registered_user;
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
