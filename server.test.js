// server.test.js
const request = require('supertest');
const app = require('./server'); // Adjust the path as necessary

describe('POST /register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  // Add more tests as needed, e.g., for invalid input, existing user, etc.
});

// Write similar tests for the DELETE endpoint and any other functionality



describe('DELETE /delete/:username', () => {
  it('should delete a user by username', async () => {
    // Assuming a user with this username already exists in your test setup
    const usernameToDelete = 'testuser';

    const res = await request(app)
      .delete(`/delete/${usernameToDelete}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });

  // Add more tests as needed, e.g., for non-existing user, invalid username, etc.
});


const request = require('supertest');
const app = require('./server'); // Adjust the path as necessary

describe('PUT /update-password/:username', () => {
  it('should update the password for a user', async () => {
    const username = 'existingUser';
    const newPassword = 'newPassword123';

    const res = await request(app)
      .put(`/update-password/${username}`)
      .send({ password: newPassword });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Password updated successfully');

    // Optionally, you can add more assertions here to verify the password change.
    // This might involve logging in with the new password, if you have such functionality.
  });

  // Additional tests can be written for scenarios such as:
  // - User does not exist
  // - Invalid password format
  // - Unauthorized password change attempts
});