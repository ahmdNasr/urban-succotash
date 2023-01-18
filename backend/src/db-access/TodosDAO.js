const { getDB } = require("./getDB");

async function findAll() {
  const db = await getDB();
  return db.collection("todos").find().sort({ createdAt: -1 }).toArray();
}
async function findById(todoId) {
  const db = await getDB();
  const todo = await db.collection("todos").findOne({ _id: ObjectId(todoId) });
  return todo;
}
async function insertOne(todoInfo) {
  const db = await getDB();
  const insertResult = await db.collection("todos").insertOne(todoInfo);
  return insertResult.acknowledged
    ? { _id: insertResult.insertedId, ...todoInfo }
    : null;
}
async function updateStatus(todoId, newStatus) {
  const db = await getDB();
  return (
    db
      .collection("todos")
      // findOneAndUpdate ... options welches doc returnen ? "before" / "after"
      .updateOne(
        { _id: ObjectId(todoId) },
        { $set: { status: newStatus, lastUpdated: Date.now() } }
      )
  );
}
async function deleteOne(todoId) {
  const db = await getDB();
  const result = await db
    .collection("todos")
    .findOneAndDelete({ _id: ObjectId(todoId) });
  const deletedTodo = result.value;
  return deletedTodo;
}

module.exports = {
  findAll,
  findById,
  insertOne,
  updateStatus,
  deleteOne,
};
