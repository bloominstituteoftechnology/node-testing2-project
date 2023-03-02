const db = require('../../data/db-config');
const Car = require('./cars-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run()
})
describe('sanity test', () => {
    test('environment is set to testing', () => {
        expect(process.env.NODE_ENV).toBe('testing');
    })
})
describe('[GET] /', () => {
    test('should return an array of car objects', async () => {
        const result = await Car.findAll()
        expect(result).toHaveLength(5)
        expect(result[0]).toMatchObject({ model: 'ct4' })
        expect(result[1]).toMatchObject({ model: 'ct5' })
        expect(result[2]).toMatchObject({ model: 'canyon' })
        expect(result[3]).toMatchObject({ model: 'sierra' })
        expect(result[4]).toMatchObject({ model: 'yukon' })
    })
    test('each car should have make, model, trim', async () => {
        const result = await Car.findAll()
        expect(result[0]).toHaveProperty('make')
        expect(result[0]).toHaveProperty('model')
        expect(result[0]).toHaveProperty('price')
    })
})
describe('[GET] /make', () => {
    test('should return an array of cars that match make', async () => {
        const result = await Car.findByMake('cadillac')
        expect(result).toHaveLength(2)
        expect(result[0]).toHaveProperty('make')
        for(let i = 0; i < result.length; i++) {
            expect(result[i]).toHaveProperty('make')
            expect(result[i].make).toEqual('cadillac')
        }
    })
    test('should not include any cars which do not match make', async () => {
        const result = await Car.findByMake('cadillac')
        expect(result).toHaveLength(2)
        expect(result[0]).toHaveProperty('make')
        for(let i = 0; i < result.length; i++) {
            expect(result[i]).toHaveProperty('make')
            expect(result[i].make).not.toEqual('ford')
            expect(result[i].make).not.toEqual('gmc')
            expect(result[i].make).not.toEqual('ferrari')
        }
    }) // this one is kinda redundant because I loop through each item in the prev test
})
describe('[POST] /', () => {
    const amg = {
        make: 'mercedes-amg',
        model: 'cla',
        trim: '45',
        price: 78035,
        link: 'https://www.mbusa.com/en/share/build/A3UKMY'
    };
    test('should add new car to the db', async () => {
        const result = await Car.insertCar(amg);
        const newData = await Car.findAll();
        expect(result.id).toBe(6);
        expect(newData.length).toBe(6)
    })
    test('should return object containing new car', async () => {
        const result = await Car.insertCar(amg);
        expect(result).toMatchObject(amg);
        expect(result.make).toBe('mercedes-amg');
        expect(result.model).toBe('cla');
        expect(result.trim).toBe('45');
        expect(result.price).toBe(78035);
        expect(result.link).toBe('https://www.mbusa.com/en/share/build/A3UKMY');
    })
})
describe('[PUT] /:id', () => {
    const updates = {
        make: 'chevrolet',
        model: 'colorado',
        trim: 'zr2',
        price: 51885,
        link: 'https://www.chevrolet.com/trucks/colorado/build-and-price/summary?styleId=431445&rpo=L3B,MFC,GU6,R1U,GBA,A50,HFD,URL,PDD,CWM,B26,CAC,KU9,A45,VAV,KI3,KSG,K4C,E90,DA5,UV2,UD7,UKI,UFB,UKK,&ss=H4sIAAAAAAAAAH1Su07EMBAcYukKehAlUnp0d3kppR9JLvLlhBKciPS0fAYlHQVfC3bOZwew2ML2jGa9s14DuAXe77D5UIheXhGpAYb7ga/ePudJbzBxA5LOPcgxYSBdzUEalYPUVQnS75SGdAah2RbkMCYgqj9q7vikF0ZBhu7Z6pZlFvqWQy2smFN9nxwakJGOXzpwjnuQOI5x8bA4cICmmd4iSzRYDosDJ2H73Gy/JGwq9GFj2YdzqcWDS+RT54GgoUJVuQ2w5j1councA5V7YFr/m2zewhtrrDGZ8oBWtkmIHZoV215YVQa0ZpLOkJmoAydWrnxE1seJFwH2UQifaGbrgBJFoKqqWYiVbZCVgW7Mz/JFxn1Aon+RkwDXiLFDBgoGjgq11kmsBP/FN18/c74rAwAA&postalCode=84005'
    };
    test('should update indicated car in the db', async () => {
        const initialCar = await Car.findById(3);
        const updatedCar = await Car.updateCar(3, updates);
        expect(updatedCar.id).toEqual(initialCar.id);
        expect(updatedCar.make).not.toEqual(initialCar.make);
        expect(updatedCar.model).not.toEqual(initialCar.model);
        expect(updatedCar.trim).not.toEqual(initialCar.trim);
        expect(updatedCar.price).not.toEqual(initialCar.price);
        expect(updatedCar.link).not.toEqual(initialCar.link);
    });
    test('should return object containing updated car', async () => {
        const updatedCar = await Car.updateCar(3, updates);
        expect(updatedCar.make).toEqual(updates.make);
        expect(updatedCar.model).toEqual(updates.model);
        expect(updatedCar.trim).toEqual(updates.trim);
        expect(updatedCar.price).toEqual(updates.price);
    })
})
describe('[DELETE] /:id', () => {
    test('should make Car.findAll.length 1 shorter', async () => {
        const initialList = await Car.findAll();
        await Car.deleteCar(1);
        const resultList = await Car.findAll();        
        expect(resultList.length).toEqual(initialList.length - 1)
    })
    test('should return object containing deleted car', async () => {
        const initialCar = await Car.findById(1);
        const result = await Car.deleteCar(1);

        expect(result).toEqual(initialCar);
    })
})