// server.js
const express = require('express');
const { createUser, deleteUser, updateUserPassword } = require('./middleware/register-helpers');
const app = express();

app.use(express.json());

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await createUser(username, password);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Delete a user by username
app.delete('/delete/:username', async (req, res) => {
  const { username } = req.params;
  try {
    await deleteUser(username);
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

// Update a user's password
app.put('/update-password/:username', async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  try {
    await updateUserPassword(username, password);
    res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).send('Error updating password');
  }
});

module.exports = app;
