const db = require('../data/db-config');
const Cubs = require('./cubs-model');

describe('cubs model', () => {
  describe('add() method', () => {
    beforeEach(async () => {
      await db('cubs').truncate();
    });

    it('should add the provided Cubs into the db', async () => {
      await Cubs.add({ name: 'Kris Byrant', position: '3B', number: 17 });
      await Cubs.add({ name: 'Anthony Rizzo', position: '1B', number: 44 });

      const cubs = await db('cubs');

      expect(cubs).toHaveLength(2);
    });

    it('should return the Cub we added', async () => {
      let cub = await Cubs.add({
        name: 'Kris Bryant',
        position: '3B',
        number: 17
      });

      expect(cub.name).toBe('Kris Bryant');

      cub = await Cubs.add({
        name: 'Anthony Rizzo',
        position: '1B',
        number: 44
      });

      expect(cub.name).toBe('Anthony Rizzo');
    });

    it('empties db', () => {
      expect(true).toBe(true);
    });
  });

  describe('remove() method', () => {
    beforeEach(async () => {
      await db('cubs').truncate();

      await Cubs.add({ name: 'Anthony Rizzo', position: '1B', number: 44 });
      await Cubs.add({ name: 'Kris Bryant', position: '3B', number: 17 });
    });

    it('should remove a Cub from the db', async () => {
      await Cubs.remove(1);

      const cubs = await Cubs.find('cubs');

      expect(cubs).toHaveLength(1);
    });

    it('should remove the proper Cub from the db', async () => {
      await Cubs.remove(1);

      const cubs = await Cubs.find('cubs');

      expect(cubs[0].name).toBe('Kris Bryant');
    });
  });
});
