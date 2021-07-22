
const games = [
  { 
    game_title: 'Eternal Darkness',
    game_genre: 'Horror'
  },
  { 
    game_title: 'Final Fantasy VII Remake',
    game_genre: 'JRPG' 
  },
  { 
    game_title: 'Mario Kart 8',
    game_genre: 'Racing'
  },
  { 
    game_title: 'Wizard of Legend',
    game_genre: 'Roguelike'
  },
  { 
    game_title: 'Dance Dance Revolution',
    game_genre: 'Rhythm'
  },
]

exports.games = games

exports.seed = function(knex) {
  return knex('games').insert(games)
}
