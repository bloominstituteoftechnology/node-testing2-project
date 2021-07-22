const db = require('../../data/dbConfig')

const getAll = () => {
   return db('resources')
}

const getById =  (id) => {
   return db('resources').where('resource_id', id).first()
}

const add = async (resource) => {
   const [id] = await db('resources').insert(resource)
   return db('resources').where('resource_id', id).first()
}

const deleteRec = async (id) => {
   const recName = await db('resources').where('resource_id', id).first()
   await db('resources').where('resource_id', id).del()
   return recName
}

module.exports = {
   getAll,
   getById,
   add,
   deleteRec
}
