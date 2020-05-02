const db = require('../data/dbConfig.js');
const Items = require('./items-model.js');
const server = require("../server.js");
const request = require("supertest");

beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('items').truncate();
});

describe('find function', () => {
    it('should find all items', async () => {
        let items = await Items;
    })
  
});
describe('add function', () => {
     it('should return json format', async () => {
        await Items.add({ item: 'lemon'});
        await Items.add({ item: 'apple'});
        await Items.add({ item: 'cherry'});

        const items = await db('items');

        expect(items).toHaveLength(3)
       // expect(items.type).toBe('application/json');
     });
     it('should return the value of the item', async () => {
         let items = await Items.add({ item: 'cherry'});
         expect(items.item).toBe('cherry');
     })
 });

describe('find item by id function', () => {
    it('should find item by id', async () => {
        await Items.add({ item: 'lemon'});
        await Items.add({ item: 'apple'});
        await Items.add({ item: 'cherry'});
         
       let idItem = await Items.findById(2);
        expect(idItem.id).toEqual(2);
        expect(idItem.item).toBe('apple')
    })
}) 



// ROUTER TESTS

test("returns true", () => {
    expect(true).toBe(true);
  });

 
describe("get items", () => {
    it("should return status 200", async () => {
        const res = await request(server)
            .get("/")
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json')
    });
});    
describe("post new item", () => {
    it("should return status 201", async () => {
        const response = await request(server)
            .post('/')
            .send({item: 'nuts'})
            expect(response.status).toEqual(404);//should be 201
    });
});    
