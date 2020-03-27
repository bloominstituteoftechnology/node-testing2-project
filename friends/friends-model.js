const db = require("../data/db-config.js");

module.exports = {
  getFriends,
  getFriendById,
  addFriend,
  updateFriend,
  deleteFriend
};

function getFriends() {
  return db("friends");
}

function getFriendById(id) {
  return db("friends")
    .where({ id })
    .first();
}

function addFriend(friend) {
  return db("friends")
    .insert(friend)
    .then(() => {
      return db("friends")
        .where({ name: friend.name })
        .first();
    });
}

function updateFriend(changes, id) {
  return db("friends")
    .where({ id })
    .update(changes)
    .then(() => {
      return getFriendById(id);
    });
}

function deleteFriend(id) {
  const friend = getFriendById(id).first();
  db("friends")
    .where({ id })
    .del();
  return friend;
}
