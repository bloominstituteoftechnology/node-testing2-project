exports.seed = async function (knex) {
  await knex('artists').insert([
    { artist_name: '4 Non Blondes' },
    { artist_name: 'R.E.M' },
    { artist_name: 'a-ha' },
    { artist_name: 'MF DOOM' },
  ]);
  await knex('genres').insert([
    { genre: '90s pop' },
    { genre: 'Alternative Rock' },
    { genre: '80s pop' },
    { genre: '00s Hip-Hop' },
  ]);
  await knex('tunes').insert([
    { tune_name: "What's up?", artist_id: 1 },
    { tune_name: 'Losing My Religion', artist_id: 2 },
    { tune_name: 'Take On Me', artist_id: 3 },
    { tune_name: 'Rhymes like Dimes', artist_id: 4 },
    { tune_name: 'Shiny Happy People', artist_id: 2 },
  ]);
  await knex('albums').insert([
    { album_name: 'Out Of Time', artist_id: 2, genre_id: 2 },
    { album_name: 'Bigger, Better, Faster, More!', artist_id: 1, genre_id: 1 },
    { album_name: 'Hunting High & Low', artist_id: 3, genre_id: 3 },
    { album_name: 'Operation: Doomsday', artist_id: 4, genre_id: 4 },
  ]);
};
