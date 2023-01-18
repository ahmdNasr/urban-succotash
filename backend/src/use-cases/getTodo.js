const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

async function getTodo({ todoId }) {
  const foundTodo = await TodosDAO.findById(todoId);
  if (!foundTodo) {
    throw new Error(`Todo with id ${todoId} not found`);
  }
  const todo = makeTodo(foundTodo);
  return todo;
}

module.exports = {
  getTodo,
};
