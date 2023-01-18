const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

async function getAllTodos() {
  const todos = await TodosDAO.findAll();
  return todos.map((todo) => makeTodo(todo));
}

module.exports = {
  getAllTodos,
};
