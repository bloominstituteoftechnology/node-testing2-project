const db = require("../data/db-config.js");

const { insert, remove } = require("./charactersModel.js");

describe("Characters model", function(){
    describe('insert()', () => {
        beforeEach(async () => {
            await db("characters").truncate();
          });
      
        it("should insert character", async function(){
            const characters = await db("characters");
            expect(characters).toHaveLength(0);
            console.log(characters)
            await insert({
                name: "Pickle Rick",
                specie: "Pickle",
                quote: "Im Pickle RICK!"
            })
            const inserted = await db("characters")
            expect(inserted).toHaveLength(1);
        })
        it("check the name of inserted character", async function(){
            const characters = await db("characters");
            expect(characters).toHaveLength(0);
            console.log(characters)
            await insert({
                name: "Pickle Rick",
                specie: "Pickle",
                quote: "Im Pickle RICK!"
            })
            const inserted = await db("characters")
            expect(inserted[0].name).toBe("Pickle Rick");
        })
    
    })
    
})

describe('remove()', () => {
    it('remove', async () => {
        await remove(1);
        const character = await db("characters");
        expect(character).toHaveLength(0);
    })
    it('remove a character given the ID', async () => {
        insert({
            name: "Pickle Pick",
            specie: "Rickle",
            quote: "Im Rickle PICK!"
        })
        await remove(0);
        const characters = await db("characters")
        expect(characters).toHaveLength(1);
    })
})