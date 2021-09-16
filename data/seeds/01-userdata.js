exports.seed = async function (knex) {
    await knex('users').truncate()
    await knex('roles').truncate()
    await knex('roles').insert([
        {role_name: 'admin'},
        {role_name: 'user'}
    ])
    await knex('users').insert([
        {
            username: 'john',
            password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', //1234
            role_id: 1
        },
        {
            username: 'jane',
            password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // password "1234"
            role_id: 2,
        }
    ])
}