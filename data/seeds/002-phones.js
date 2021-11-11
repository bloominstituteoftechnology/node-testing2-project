const phones = [
    { phone_name: "iphone x", company_id: 1 },
    { phone_name: "galaxy s8", company_id: 2 },
    { phone_name: "google pixel 2", company_id: 3 },
];





exports.seed = function(knex, Promise) {
    return knex("phones")
        .truncate()
        .then(function() {
            return knex("phones").insert(phones);
        });
};