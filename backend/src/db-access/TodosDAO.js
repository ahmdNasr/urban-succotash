const { getDB } = require("./getDB");

function findAll() {
  return getDB().then((db) =>
    db.collection("todos").find().sort({ createdAt: -1 }).toArray()
  );
}
function findById(todoId) {
  return getDB().then((db) =>
    db.collection("todos").findOne({ _id: ObjectId(todoId) })
  );
}
function insertOne(todoInfo) {
  return getDB()
    .then((db) => db.collection("todos").insertOne(todoInfo))
    .then((insertResult) => {
      return insertResult.acknowledged
        ? { _id: insertResult.insertedId, ...todoInfo }
        : null;
    });
}
function updateStatus(todoId, newStatus) {
  return getDB().then((db) =>
    db
      .collection("todos")
      // findOneAndUpdate ... options welches doc returnen ? "before" / "after"
      .updateOne(
        { _id: ObjectId(todoId) },
        { $set: { status: newStatus, lastUpdated: Date.now() } }
      )
  );
}
function deleteOne(todoId) {
  return getDB().then((db) =>
    db
      .collection("todos")
      .findOneAndDelete({ _id: ObjectId(todoId) })
      .then((result) => {
        const deletedTodo = result.value;
        return deletedTodo;
      })
  );
}

module.exports = {
  findAll,
  findById,
  insertOne,
  updateStatus,
  deleteOne,
};
