const { getDB } = require("./getDB");

function findByEmail(email) {
  return getDB().then((db) => db.collection("users").findOne({ email }));
}

function insertOne(user) {
  return getDB()
    .then((db) => db.collection("users").insertOne(user))
    .then((insertResult) => {
      return insertResult.acknowledged
        ? { _id: insertResult.insertedId, ...user }
        : null;
    });
}

module.exports = {
  findByEmail,
  insertOne,
};
