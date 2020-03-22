
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {id: 1, action_name: 'Longbow', action_type: "Ranged", dmg_type: "Piercing", dice_amt: 1, dice: 8, to_hit_mod: 7, dmg_mod: 4, user_id: 1},
        {id: 2, action_name: 'Talon', action_type: "Melee", dmg_type: "Slashing", dice_amt: 1, dice: 8, to_hit_mod: 5, dmg_mod: 4, user_id: 1},
        {id: 3, action_name: 'Shortbow', action_type: "Ranged", dmg_type: "Piercing", dice_amt: 1, dice: 6, to_hit_mod: 9, dmg_mod: 4, user_id: 2},
        {id: 4, action_name: 'Backstab', action_type: "Melee", dmg_type: "Piercing", dice_amt: 4, dice: 6, to_hit_mod: 5, dmg_mod: 4, user_id: 2},
        
      ]);
    });
};
