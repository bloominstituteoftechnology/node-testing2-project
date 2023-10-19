const db = require("../../database/db-config");
const UserData = require("../users/users.model");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})


describe("[DB Access Fn GETALL()]", () => {
    test("[1]Resolves all users correctly", async () => {
        const result = await UserData.getAll();
        expect(result).toHaveLength(5);
        expect(result).toMatchObject([
            { "id": 1, "married": true, "name": "jacob" },
            { "id": 2, "married": false, "name": "alfred" },
            { "id": 3, "married": false, "name": "louis" },
            { "id": 4, "married": true, "name": "alaina" },
            { "id": 5, "married": false, "name": "bilbo" },
        ])
    })
})

describe("[DB Access Fn GETBYID()]", () => {
    test("[2]Resolves user by id correctly", async () => {
        let result = await UserData.getById(1);
        expect(result).toMatchObject([{ id: 1, name: "jacob", married: true }])
        result = await UserData.getById(2);
        expect(result).toMatchObject([{ id: 2, name: "alfred", married: false }])
    })
    test("[3]If id does not exist, returns empty array", async () => {
        let result = await UserData.getById(19);
        expect(result).toHaveLength(0);
    })
})

describe("[DB Access Fn ADD()]", () => {
    test("[4]Returns added user with default married value", async () => {
        const user = { name: "test" };
        const expected = [{ id: 6, name: "test", married: false }]
        let result = await UserData.add(user);
        expect(result).toEqual(expected)
    })
    test("[5]Creates new user in the database", async () => {
        const user = { name: "test" };
        const expected = [
            { "id": 1, "married": 1, "name": "jacob" },
            { "id": 2, "married": 0, "name": "alfred" },
            { "id": 3, "married": 0, "name": "louis" },
            { "id": 4, "married": 1, "name": "alaina" },
            { "id": 5, "married": 0, "name": "bilbo" },
            { "id": 6, "married": 0, "name": "test" }
        ];
        await UserData.add(user);
        expect(await db("users")).toEqual(expected);
        expect(await db("users")).toHaveLength(6);
    })
})

describe("[DB Access Fn UPDATE()]", () => {
    test("[6]Returns updated user", async () => {
        const user = { married: 1, name: "JACOB" }
        const expected = [{ id: 1, name: "JACOB", married: true }]
        const result = await UserData.update(1, user);
        expect(result).toEqual(expected);
        expect(result.name).not.toBe(user.name);
    })
    test("[7]Successfully updates user in the Database", async () => {
        const user = { married: 1, name: "JACOB" }
        const expected = [{ id: 1, name: "JACOB", married: 1 }]
        await UserData.update(1, user);
        expect(await db("users").where("id", 1)).toEqual(expected);
    })
})

describe("[DB Access Fn REMOVE()]", () => {
    test("[8]Returns Database as proof of deleted user", async () => {
        const idToDelete = 1;
        const result = await UserData.remove(idToDelete);
        expect(result).toHaveLength(4);
        expect(result).toEqual([
            { "id": 2, "married": false, "name": "alfred" },
            { "id": 3, "married": false, "name": "louis" },
            { "id": 4, "married": true, "name": "alaina" },
            { "id": 5, "married": false, "name": "bilbo" }
        ])
    })
})