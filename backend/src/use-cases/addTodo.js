const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

async function addTodo({ text, image }) {
  const newTodo = makeTodo({ text, image }); // noch keine _id zb

  const addedTodo = await TodosDAO.insertOne(newTodo);
  if (!addedTodo) {
    throw new Error("Could not add todo");
  }

  return makeTodo(addedTodo);
}

module.exports = {
  addTodo,
};
