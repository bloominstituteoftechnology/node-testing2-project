/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sec_teams").del();
  await knex("sec_teams").insert([
    { id: 1, school_name: "Alabama", mascot: "Crimson Tide" },
    { id: 2, school_name: "Arkansas", mascot: "Razorbacks" },
    { id: 3, school_name: "Auburn", mascot: "Tigers" },
    { id: 4, school_name: "Florida", mascot: "Gators" },
    { id: 5, school_name: "Georgia", mascot: "Bulldogs" },
    { id: 6, school_name: "Kentucky", mascot: "Wildcats" },
    { id: 7, school_name: "LSU", mascot: "Tigers" },
    { id: 8, school_name: "Ole Miss", mascot: "Rebels" },
    { id: 9, school_name: "Mississippi State", mascot: "Bulldogs" },
    {
      id: 10,
      school_name: "South Carolina",
      mascot: "Gamecocks",
    },
    { id: 11, school_name: "Tennessee", mascot: "Volunteers" },
    { id: 12, school_name: "Texas A&M", mascot: "Aggies" },
    { id: 13, school_name: "Vanderbilt", mascot: "Commodores" },
    { id: 14, school_name: "Missouri", mascot: "Tigers" },
    { id: 15, school_name: "Oklahoma", mascot: "Sooners" },
    { id: 16, school_name: "Texas", mascot: "Longhorns" },
  ]);
};
