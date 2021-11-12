const companies = [
    {company_name: "apple"},
    {company_name: "samsung"},
    {company_name: "google"}
];

exports.seed = function(knex, Promise) {
    return knex("companies")
        .truncate()
        .then(function() {
            return knex("companies").insert(companies);
        });
};

