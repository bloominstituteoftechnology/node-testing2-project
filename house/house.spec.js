const House = require('./house-modal.js');


describe.skip('House model', function() {
  describe('add()', function() {
      test('adds a new house', function() {
        return House.add({ houseName: "RavenClaw"})
      })
  })
})
