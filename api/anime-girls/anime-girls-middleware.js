const Anime = require('./anime-girls-model');

async function checkValidId(req, res, next) {
 const results = await Anime.getById(req.params.id);
 if (results == null) {
  res.status(404).json({message: "Anime girl not found"});
  return;
 }
 next();
}

function checkValidPayload(req, res, next) {
  const name = req.body.name;
  if (name == null || name.trim() === '') {
    res.status(400).json({message: "Anime girl required"});
    return;
  }
  next();
}


module.exports = {
  checkValidId,
  checkValidPayload,
}