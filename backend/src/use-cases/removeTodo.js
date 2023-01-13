const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");
const { deleteTodoImage } = require("../utils/deleteTodoImage");

function removeTodo({ todoId }) {
  // FIXME: make delete return only one document + adjust in frontend
  return TodosDAO.deleteOne(todoId)
    .then((deletedTodo) => deleteTodoImage(deletedTodo.image))
    .then(() => TodosDAO.findAll())
    .then((todos) => todos.map((todo) => makeTodo(todo)));
}

module.exports = {
  removeTodo,
};
