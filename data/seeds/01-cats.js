exports.seed = function (knex) {
    return knex('cats').insert([
        {
        name: 'Heinrich',
        breed: 'American Short Hair',
        age: 1,
        hairless: false
        },
        {
        name: 'Hermann',
        breed: 'American Short Hair',
        age: 1,
        hairless: false
        },
        {
        name: 'Boo',
        breed: 'Maine Coon',
        age: 16,
        hairless: false
        },
        {
        name: 'Toast',
        breed: 'Peterbald',
        age: 4,
        hairless: true
        },
    ]);
};