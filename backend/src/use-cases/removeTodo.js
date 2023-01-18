const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");
const { deleteTodoImage } = require("../utils/deleteTodoImage");

async function removeTodo({ todoId }) {
  // FIXME: make delete return only one document + adjust in frontend
  const deletedTodo = await TodosDAO.deleteOne(todoId);
  await deleteTodoImage(deletedTodo.image);
  const todos = await TodosDAO.findAll();
  return todos.map((todo) => makeTodo(todo));
}

module.exports = {
  removeTodo,
};
