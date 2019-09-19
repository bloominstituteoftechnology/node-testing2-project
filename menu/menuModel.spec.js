const db = require('../data/dbConfig');
const MenuModel = require('./menuModel.js')

describe('menu model', ()=> {
    describe('insert()', ()=> {
    beforeEach(async ()=> {
        await db('menu').truncate()
    })
    it('should insert 2 items', async ()=>{
        await MenuModel.add({item: 'Pho' });
        await MenuModel.add({item:'spring Rolls' });

        const Menu = await db('menu');
        expect(Menu).toHaveLength(2)

    })
})
})