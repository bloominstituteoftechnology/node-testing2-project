const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

describe('server.js', () => {
    it('should set testing environment', () => {
      expect(process.env.NODE_ENV).toBe('testing')
    });
});