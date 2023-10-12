const db = require('../../data/db-config.js');

function findAll() {
    return db('videogames')
        .join('genere', 'videogames.genere_id', 'genere.genere_id')
        .select('vg_name', 'vg_year', 'vg_rating', 'genere_name')
}

function findByGenere(genere_id) {
    return db('videogames').where('genere_id', genere_id)
}

function findById(id) {
    return db('videogames')
    .join('genere', 'videogames.genere_id', 'genere.genere_id')
    .where('vg_id', id)
}

async function add({ vg_name, vg_year, vg_rating, genere_name }) {
    let created_videogame_id
    await db.transaction(async trx => {
      let genere_id_to_use
      const [genere] = await trx('genere').where('genere_name', genere_name)
      if (genere) {
        genere_id_to_use = genere.genere_id
      } else {
        const [genere_id] = await trx('genere').insert({ genere_name: genere_name })
        genere_id_to_use = genere_id
      }
      const [videogame_id] = await trx('videogames').insert({ vg_name, vg_year ,vg_rating, genere_id: genere_id_to_use })
      created_videogame_id = videogame_id
    })
    return findById(created_videogame_id)
  }

module.exports = {
    findAll,
    findByGenere,
    add,
}