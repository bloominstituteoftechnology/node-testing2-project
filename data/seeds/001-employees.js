
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        {id: 1, name:"John Wilks Booth", email:"JW@email.com", department:"Customer Relations"},
        {id: 2, name:"Teddy Bundy", email:"oldteds@myemail.com", department:"Human Resources"},
        {id: 3, name:"Jeffory Dommer", email:"jeffy123@email.com", department:"Cafeteria"}
      ]);
    });
};
