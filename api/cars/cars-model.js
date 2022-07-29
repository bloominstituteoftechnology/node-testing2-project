const db = require('../../data/db-config');

async function createCar(car) {
    const [id] = await db("cars").insert(car)
    return db("cars").where("id", id).first()
}

async function deleteCar(id) {
    const car = await db("cars").where("id", id).first()
    await db("cars").delete().where("id", id)
    return car
}

module.exports = {
    createCar,
    deleteCar,
}