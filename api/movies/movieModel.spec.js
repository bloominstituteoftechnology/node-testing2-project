const db = require('../../data/dbConfig.js');

const Movies = require('./movieModel.js');

beforeEach(async () => {
  await db('movies').truncate();
});

describe(' movieModel', () => {

  describe('add()', () => {
    it('should add movies to db', async () => {
      let movies = await db('movies');
      expect(movies).toHaveLength(0);

      await Movies.add({ title:"test", overview:"test overview" });

      movies = await db('movies');
      expect(movies).toHaveLength(1);
    });
    it('should add the provided hobbit to db', async () => {
      let movie = await Movies.add({ title:"test", overview:"test overview" });
      expect(movie.title).toBe('test');
      expect(movie.overview).toBe('test overview');
    
      movie = await Movies.add({ title:"movie", overview:"best movie" });
      expect(movie.title).toBe('movie');
      expect(movie.overview).toBe('best movie');
    });
  });

  describe('remove()', () => {
    it('should delete movies from db', async () => {
      
      await Movies.add({ title:"test", overview:"test overview" });
      let movies = await db('movies');
      expect(movies).toHaveLength(1);

      await Movies.remove(1);
      movies = await db('movies');
      expect(movies).toHaveLength(0);
    });
    it('should delete the provided movie from db', async () => {
      await Movies.add({ title:"test", overview:"test overview" });

      let movie = await Movies.remove(1);
      expect(movie.title).toBe('test');
      expect(movie.overview).toBe('test overview');
    
    });
  });
});