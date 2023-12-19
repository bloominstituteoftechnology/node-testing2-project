const db = require('../../db-config'); // Adjust the path to your db-config file
afterAll(async () => {
    await db.destroy();
  });

// dbHelpers.js

const createUser = async (username, password) => {
  try {
    await db('users').insert({ username, password }); // Hash password in a real app
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    return { success: false, message: 'Error registering user', error };
  }
};

const deleteUser = async (username) => {
  try {
    await db('users').where({ username }).del();
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Error deleting user', error };
  }
};

const updateUserPassword = async (username, newPassword) => {
  try {
    await db('users').where({ username }).update({ password: newPassword }); // Hash password in a real app
    return { success: true, message: 'Password updated successfully' };
  } catch (error) {
    return { success: false, message: 'Error updating password', error };
  }
};

module.exports = { createUser, deleteUser, updateUserPassword };
