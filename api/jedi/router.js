const express = require("express");

const Jedi = require("./model");

const server = express();

server.use(express.json());


server.get("/jedi", (req, res) => {
  Jedi.getAll()
    .then(jedi => {
      res.status(200).json(jedi);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/jedi", async (req, res) => {
    try {
        const padawan = await Jedi.insert(req.body)
        res.status(200).json(padawan);
    } catch (e) {
        res.status(500).json(e);
    }
});

server.delete("/jedi/:id", async (req, res) => {
    const {id} = req.params
  try {
    const padawanAfterAnakin = await Jedi.remove(id)
    res.status(200).json(padawanAfterAnakin);
} catch (e) {
    res.status(500).json(e);
}
});



module.exports = server;