const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

function getAllTodos() {
  return TodosDAO.findAll().then((todos) =>
    todos.map((todo) => makeTodo(todo))
  );
}

module.exports = {
  getAllTodos,
};
