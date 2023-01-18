const { getDB } = require("./getDB");

async function findByEmail(email) {
  const db = await getDB();
  const user = await db.collection("users").findOne({ email });
  return user;
}

async function insertOne(user) {
  const db = await getDB();
  const insertResult = await db.collection("users").insertOne(user);
  return insertResult.acknowledged
    ? { _id: insertResult.insertedId, ...user }
    : null;
}

module.exports = {
  findByEmail,
  insertOne,
};
