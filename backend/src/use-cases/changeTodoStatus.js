const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

function changeTodoStatus({ todoId, newStatus }) {
  // FIXME: make update return only one document + adjust in frontend
  // unser frontend ist beim update noch auf dem alten stand, dass alle todos (nach dem update) returned werden !
  return TodosDAO.updateStatus(todoId, newStatus)
    .then(() => TodosDAO.findAll())
    .then((todos) => todos.map((todo) => makeTodo(todo)));
}

module.exports = {
  changeTodoStatus,
};
