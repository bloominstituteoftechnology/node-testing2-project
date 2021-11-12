const db = require("../../data/db-config");

const getAll = () => db("info");

const getBy = filter => db("info").where(filter);

const getById = id => db("info").where({ id }).first();

const insert = ({title, info}) => db("info").insert({title, info}).then(([id]) => {return{id, title, info}});

const updateById = (id, {title, info}) => db("info").where({ id }).update({title, info}).then(() => {return{id:Number(id), title, info}});

const deleteById = id => db("info").where({ id }).del();

module.exports = {
  getAll,
  getBy,
  getById,
  insert,
  updateById,
  deleteById
};