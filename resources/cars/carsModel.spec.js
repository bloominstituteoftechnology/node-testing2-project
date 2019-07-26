
const request = require('supertest'); // npm i supertest -D
const Cars = require('./cars-model')
const db = require('../../data/dbconfig');



describe('cars model', () =>{

    beforeEach(async () =>{
       await db('cars').truncate()
    });


    
    const body = {
        make:"BMW",
        model:"650ci",
        year:2017
    };

    const secondCar = {
        make:"Audi",
        model:"Q4",
        year:2017
    };
    
    
    describe('insert', () =>{

       
         it('body not to be null', () =>{
               expect(body).not.toBeNull();
         });

         it('body not to be undefined', () =>{
               expect(body).not.toBeUndefined();
         });


        it('body make not to be empty', () =>{
            expect(body).toMatchObject({
                make: expect.any(String),
                model: expect.any(String),
                year: expect.any(Number)
              })
        });

        it('should insert car into db', async () =>{
            await Cars.addCars(body);
            const cars = await db('cars');
            expect(cars).toHaveLength(1);
        });


     });


     describe('delete', () =>{
         const id = 1;
         
         it('expect id not to be null', () =>{
             //expect id to be a number
             expect(id).not.toBeNull(); 
        });
         it('expect id to be undefined', () =>{
             //expect id to be a number
             expect(id).not.toBeUndefined(); 
        });
         it('expect id to be a number', () =>{
             //expect id to be a number
             expect(id).not.toBeNaN(); 
        });

         it('expect car to be in db', async() =>{
             //add data to db
             await Cars.addCars(body);
             await Cars.addCars(secondCar);

             const car = await Cars.getCarsBy(id);

            expect(car).toBeTruthy()
        });

        it('expect deleted car to be false', async() =>{
            //add data to db
            await Cars.addCars(body);
            await Cars.addCars(secondCar);

            //delete 1st car
            
            const remove = await Cars.deleteCar(id);
            const DeletedCar = await Cars.getCarsBy(id)

            expect(DeletedCar).toBeFalsy();
       });

        it('expect a single car entry', async() =>{
            //add data to db
            await Cars.addCars(body);
            await Cars.addCars(secondCar);

            //delete 1st car
            
            const remove = await Cars.deleteCar(id);
            const DeletedCar = await Cars.getCarsBy(id)

            const cars = await db('cars');
            expect(cars).toHaveLength(1);
       });

         
     });
});