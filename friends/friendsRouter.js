const express = require("express");
const Friends = require("./friends-model.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const friends = await Friends.getFriends();
    res.status(200).json(friends);
  } catch (err) {
    console.log("get friends error", err);
    res
      .status(500)
      .json({ message: "there was an error retrieving friends", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const friend = await Friends.getFriendById(req.params.id);
    res.status(200).json(friend);
  } catch (err) {
    console.log("get friends error", err);
    res
      .status(500)
      .json({
        message: "there was an error retrieving friend by id",
        error: err
      });
  }
});

router.post("/", async (req, res) => {
  try {
    const newFriend = {
      name: req.body.name
    };
    await Friends.addFriend(newFriend).then(friend => {
      res.status(201).json(friend);
    });
  } catch (err) {
    console.log("get friends error", err);
    res
      .status(500)
      .json({ message: "there was an error adding friend", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const friend = await Friends.deleteFriend(req.params.id);
    res.status(200).json(friend);
  } catch (err) {
    console.log("get friends error", err);
    res
      .status(500)
      .json({ message: "there was an error adding friend", error: err });
  }
});

module.exports = router;
