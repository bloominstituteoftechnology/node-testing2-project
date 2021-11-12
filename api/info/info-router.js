const router = require("express").Router();

const model = require("./info-model");

router.get("/", (req, res) => {
  model.getAll()
    .then(info => res.status(200).json(info))
    .catch(() => res.sendStatus(500));
});

router.get("/:id", (req, res) => {
  model.getById(req.params.id)
    .then(info => info ? res.status(200).json(info) : res.status(404).json({message:`info with id ${req.params.id} not found`}))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  const { title, info } = req.body;
  if(title && info && typeof title === "string" && typeof info === "string"){
    model.insert({title, info})
      .then(info => res.status(201).json(info))
      .catch(() => res.sendStatus(500));
  } else res.status(401).json({message:"You must include a valid title and valid info"});
});

router.put("/:id", async (req, res) => {
  const { title, info } = req.body;
  const { id } = req.params;
  if(title && info && typeof title === "string" && typeof info === "string"){
    if(await model.getById(id)){
      model.updateById(id, {title, info})
        .then(info => res.status(200).json(info))
        .catch(() => res.sendStatus(500));
    } else res.status(404).json({message:`info with id ${req.params.id} not found`});
  } else res.status(401).json({message:"You must include a valid title and valid info"});
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const info = await model.getById(id);
  if(info){
    model.deleteById(id).then(() => res.status(200).json(info))
      .catch(() => res.sendStatus(500));
  } else res.status(404).json({message:`info with id ${req.params.id} not found`});
})

module.exports = router;