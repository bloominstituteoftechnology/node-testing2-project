const request = require('supertest');
// const auth = require('../auth/auth-router.js');
const House = require('../house/house-modal.js');

const db = require('../database/dbConfig.js');


// describe('auth', function() {
//   describe('test environment', function() {
//     it('should use the testing environment', function(){
//       expect(process.env.DB_ENV).toBe('testing');
//     })
//   })

//   describe('add()', function() {
//     beforeEach(async () => {
//       await db('house').truncate();
//     })
//     it('adds new house', async function() {
//      await House.add({ houseName: "Vraven", password:"123"});
//      await House.add({ houseName: "Traven", password:"123"});


//      //checking if House is there
//     //  let user = await House.add({ houseName: "JS", password:"123"})

//      const houses =  await House.find();

//      expect(houses).toHaveLength(2);
//     })
//   })
// })

describe('removeUser()', function() {
  
  // beforeEach(async () => {
  //   await db('house').truncate();
  // })
  it('removes the user from the db', async function() {
      //check that that table is empty

      //add a house

    //  await House.add({ houseName: "eraven", password:"123"});
    //  await House.add({ houseName: "Traven", password:"123"});


     //checking if House is there
    //  let user = await House.add({ houseName: "JS", password:"123"})
      const houses =  await House.find();

     expect(houses).toHaveLength(3);

     //delete house
    //  let user = await House.findById({id})
     await House.removeUser([id === 1]);

     //check if house is deleted

     const deletedHouse = await House.find();

     expect(deletedHouse).toBe(null);
    })
  })
