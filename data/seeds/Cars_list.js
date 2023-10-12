


exports.seed = async function (knex) {
    await knex("makes").truncate();
    await knex("makes").insert([
        { make_name: "Toyota" },
        { make_name: "Honda" },
        { make_name: "Ford" },
        { make_name: "Chevy" },
        { make_name: "GMC" },
        { make_name: "Hyndai" },
        { make_name: "Dodge" },

    ]);

    await knex("models").truncate();
    await knex("models").insert([
        {
            make_id: 1,
            model_name: "Highlander",
            model_year: 2024,
        },
        {
            make_id: 1,
            model_name: "Tundra",
            model_year: 2024,
        },
        {
            make_id: 1,
            model_name: "Tacoma",
            model_year: 2024,
        },
        {
            make_id: 1,
            model_name: "4 Runner",
            model_year: 2024,
        },
        {
            make_id: 2,
            model_name: "Ridgeline",
            model_year: 2024,
        },
        {
            make_id: 2,
            model_name: "CRV",
            model_year: 2024,
        },
        {
            make_id: 2,
            model_name: "Civic",
            model_year: 2024,
        },
        {
            make_id: 2,
            model_name: "Accord",
            model_year: 2024,
        },
        {
            make_id: 2,
            model_name: "Pilot",
            model_year: 2024,
        }


    ])
}